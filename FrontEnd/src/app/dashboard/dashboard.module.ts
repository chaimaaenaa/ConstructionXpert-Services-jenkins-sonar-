import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';



//++++++++++++++Angular Materail
//dashboard
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,

        //+++++++++++++++Angular material
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class DashboardModule { }
