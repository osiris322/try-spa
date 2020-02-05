import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './containers/main/main.component';
import { AccessGuard } from '../auth/guards/access.guard';
import { AppMainComponent } from '../_layout/app-main/app-main.component';
import { NavMain } from './nav-main';


const routes: Routes = [
    {
        path: '',
        component: AppMainComponent,
        canActivate: [AccessGuard],
        canLoad: [AccessGuard],
        children: [
            {path: 'main', component: MainComponent}, 
        ],
        data: { titleToolbar: "Главная", nav: NavMain}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
