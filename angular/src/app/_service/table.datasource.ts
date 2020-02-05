import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
//import {Lesson} from "../model/lesson";
import {CoursesService} from "./courses.service";
import {catchError, finalize} from "rxjs/operators";



export class TableDataSource implements DataSource {

    private itemsSubject = new BehaviorSubject<any>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private coursesService: CoursesService) {

    }

    loadItems(courseId:number,
                filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.coursesService.findLessons(courseId, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(items => this.itemsSubject.next(items));

    }

    connect(collectionViewer: CollectionViewer): Observable<any> {
        console.log("Connecting data source");
        return this.itemsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.itemsSubject.complete();
        this.loadingSubject.complete();
    }

}
