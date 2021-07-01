import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthGuardService } from 'services/auth-guard.service';


@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],

})
export class DashboardModule { }
