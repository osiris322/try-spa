import { Component, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-module',
  templateUrl: './dialog-module.component.html',
  styleUrls: ['./dialog-module.component.css']
})
export class DialogModuleComponent {
  @Input() nameModule: string;
  constructor(public dialog: MatDialog) { }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogModuleContent, {

        width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'dialog-module-content',
  templateUrl: './dialog-module-content.html',
  styleUrls: ['./dialog-module-content.css']
})
export class DialogModuleContent{}
