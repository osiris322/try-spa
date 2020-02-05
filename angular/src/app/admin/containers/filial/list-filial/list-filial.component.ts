import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FilialService } from '../../../services/filial.service';
import { Filial } from 'src/app/_models/filial';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";

@Component({
  selector: 'app-list-filial',
  templateUrl: './list-filial.component.html',
  styleUrls: ['./list-filial.component.css']
})
export class ListFilialComponent implements OnInit, AfterViewInit {
  
  filial:Filial;
  displayedColumns: string[] = ['name', 'short_name'];
  dataSource: LessonsDataSource;
  //isLoadingResults = true;
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('input', { static: false }) input: ElementRef;
  
  constructor(private filialService: FilialService) { }

  /*ngOnInit() {
    this.filialService.getFilials()
      .subscribe((res: any) => {
        this.data = new MatTableDataSource<Filial>(res.data.items);
        this.paginator.length = res.data._meta.totalCount;
        this.paginator.pageSize = res.data._meta.perPage;
        this.paginator.pageIndex = res.data._meta.currentPage;
        this.data.paginator = this.paginator;
        console.log(res.data._meta);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }*/
    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        this.dataSource = new LessonsDataSource(this.coursesService);

        this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadLessonsPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadLessonsPage())
        )
        .subscribe();

    }

    loadLessonsPage() {
        this.dataSource.loadLessons(
            this.course.id,
            this.input.nativeElement.value,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }
}
