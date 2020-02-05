import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from "@angular/material";
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './containers/admin/admin.component';
import { AddFilialComponent } from './containers/filial/add-filial/add-filial.component';
import { EditFilialComponent } from './containers/filial/edit-filial/edit-filial.component';
import { ListFilialComponent } from './containers/filial/list-filial/list-filial.component';

@NgModule({
  declarations: [
    AdminComponent,
    AddFilialComponent,
    EditFilialComponent,
    ListFilialComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
