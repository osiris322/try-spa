import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolbarService } from '../../services/toolbar.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    randomNumber: Observable<number>;
    
    constructor(private tollbar: ToolbarService) {}

    ngOnInit() {
        this.randomNumber = this.tollbar.getName();

    }

    
}
