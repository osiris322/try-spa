import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule} from '@angular/material/menu';
import { MatDividerModule} from '@angular/material/divider';


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppMainComponent } from './_layout/app-main/app-main.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { DialogModuleComponent, DialogModuleContent } from './_layout/dialog-module/dialog-module.component';


import { AppRoutingModule } from './app.routing.module';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AdminModule } from './admin/admin.module';
//import { LayoutModule } from './_layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AppMainComponent,
    FooterComponent,
    DialogModuleComponent,
    DialogModuleContent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    AuthModule,
    MainModule,
    AdminModule,
   // LayoutModule,
    AppRoutingModule,

  ],
  entryComponents:[DialogModuleComponent, DialogModuleContent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
