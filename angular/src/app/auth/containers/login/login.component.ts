import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: Observable<boolean>;
  loginForm: FormGroup;
  error = '';
  btDisabled = false;
  
  constructor(
        private isLoadingService: IsLoadingService,
        private authService: AuthService, 
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private router: Router) { }
        

  // валидация формы
  initForm(){
    this.loginForm = this.formBuilder.group({
     username: ['', [
       Validators.required,
       Validators.pattern('^[a-zA-Z0-9]+$')
      ]
     ],
     password: ['', [
       Validators.required,
       Validators.pattern('^[a-zA-Z0-9]+$')
      ]
     ]
    });  

  }
  ngOnInit() {
    this.initForm();
    this.isLoading = this.isLoadingService.isLoading$();

  }

  get f() { return this.loginForm.controls; }

  login() {
    this.isLoadingService.add();
    this.btDisabled = true;
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )
    .subscribe(
        result => {
            if (result.success) {
              this.router.navigate(['/main']);
            }
            else {
               
               this.snackBar.open('Не верный Логин или Пароль',
                    'Скрыть', {
                   duration: 3500, 
                });
            }
        },
        error => {
            this.error = error.data;
        },
        () => {
            this.isLoadingService.remove();
            this.btDisabled = false;
        },
    );
  }

}
