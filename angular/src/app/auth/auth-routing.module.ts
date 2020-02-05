import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModules { }
