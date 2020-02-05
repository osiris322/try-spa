import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { AppMainComponent } from '../_layout/app-main/app-main.component';
import { FooterComponent } from '../_layout/footer/footer.component';
import { DialogModuleComponent, DialogModuleContent } from '../_layout/dialog-module/dialog-module.component';


@NgModule({
  declarations: [
    AppMainComponent,
    FooterComponent,
    DialogModuleComponent,
    DialogModuleContent 
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule
  ],
  entryComponents:[DialogModuleComponent, DialogModuleContent]
})
export class LayoutModule { }
