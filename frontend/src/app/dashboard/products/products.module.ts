import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductViewComponent } from './product-view/product-view.component';
import { SharedModule } from 'app/shared/shared.module';
import { SellerProductService } from 'services/seller-product.service';
import { BidDialogComponent } from './bid-dialog/bid-dialog.component';
import { BidService } from 'services/bid.service';


@NgModule({
  declarations: [ProductViewComponent, BidDialogComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  providers: [
    SellerProductService,
    BidService
  ]
})
export class ProductsModule { }
