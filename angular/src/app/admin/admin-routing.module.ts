import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuard } from '../auth/guards/access.guard';
import { AdminComponent } from './containers/admin/admin.component';
import { AddFilialComponent } from './containers/filial/add-filial/add-filial.component';
import { EditFilialComponent } from './containers/filial/edit-filial/edit-filial.component';
import { ListFilialComponent } from './containers/filial/list-filial/list-filial.component';
import { AppMainComponent } from '../_layout/app-main/app-main.component';
import { NavAdmin } from './nav-admin';

const routes: Routes = [
    {
        path: 'admin',
        component: AppMainComponent,
        canActivate: [AccessGuard],
        canLoad: [AccessGuard],
        children: [
            {
                path: '', 
                component: AdminComponent
            }, 
            {
                path: 'filials', 
                component: ListFilialComponent,
                children: [
                    {
                        path: 'add', 
                        component: AddFilialComponent
                    },
                    {
                        path: 'edit/:id', 
                        component: EditFilialComponent
                    },
                ]
            }, 
        ],
        data: { titleToolbar: "Администрирование", nav: NavAdmin }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
