import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule } from '@angular/material';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { AccessGuard } from './guards/access.guard';
import { TokenInterceptor } from './token.interceptor';
import { AuthRoutingModules } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent],
  providers: [
    AuthGuard,
    AuthService,
    AccessGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    AuthRoutingModules
  ]
})
export class AuthModule { }
