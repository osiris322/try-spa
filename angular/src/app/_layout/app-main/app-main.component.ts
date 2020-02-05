import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
@Component({
selector: 'app-app-main',
        templateUrl: './app-main.component.html',
        styleUrls: ['./app-main.component.css']
        })
export class AppMainComponent implements OnInit {
    fillerNav;
    isLoading: Observable < boolean > ;
    username: string;
    titleToolbar: string;
    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private isLoadingService: IsLoadingService, ) { }

    ngOnInit() {
        this.isLoading = this.isLoadingService.isLoading$();
            this.username = this.authService.getUsername();
            this.activatedRoute.data.subscribe(data => {
                this.titleToolbar = data.titleToolbar;
                this.fillerNav = data.nav;
            })
    }

    logout() {
        this.isLoadingService.add();
            this.authService.logout()
            .subscribe(success => {
            this.isLoadingService.remove();
                    if (success) {
            this.router.navigate(['/login']);
            }
            });
    }


}
