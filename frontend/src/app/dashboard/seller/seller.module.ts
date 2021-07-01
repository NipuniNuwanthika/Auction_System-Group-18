import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProductAddDialogComponent } from './product-add-dialog/product-add-dialog.component';
import { SellerProductService } from 'services/seller-product.service';
import { LightboxModule } from 'ngx-lightbox';
import { LoginService } from 'services/login.service';
import { BidViewDialogComponent } from './bid-view-dialog/bid-view-dialog.component';
import { BidService } from 'services/bid.service';


@NgModule({
  declarations: [SellerDashboardComponent, ProductAddDialogComponent, BidViewDialogComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule,
    LightboxModule
  ],
  providers: [
    SellerProductService,
    LoginService,
    BidService
  ]
})
export class SellerModule { }
