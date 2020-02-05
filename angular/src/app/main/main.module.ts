import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';


import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MainComponent } from './containers/main/main.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,

  ],
  
})
export class MainModule { }
