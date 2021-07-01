import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { BidService } from 'services/bid.service';
import { LoginService } from 'services/login.service';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';


@NgModule({
  declarations: [BuyerDashboardComponent, PaymentDialogComponent],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    SharedModule
  ],
  providers: [
    BidService,
    LoginService
  ]
})
export class BuyerModule { }
