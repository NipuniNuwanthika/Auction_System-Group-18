import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SellerProductService } from 'services/seller-product.service';
import { URL_CONFIG } from '../../../../../config/urlConfig';
import { ProductAddDialogComponent } from '../product-add-dialog/product-add-dialog.component';
import { Lightbox } from 'ngx-lightbox';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { LoginService } from 'services/login.service';
import { Router } from '@angular/router';
import { BidViewDialogComponent } from '../bid-view-dialog/bid-view-dialog.component';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  isDataLoading: boolean = false;
  isFirstTime: boolean = true;
  dataList = [];
  imageLoadPath = URL_CONFIG.IMAGE_LOAD_URL;

  constructor(
    private dialog: MatDialog,
    private sellerProductService: SellerProductService,
    private _lightbox: Lightbox,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllSellerProducts();
  }

  open(images): void {
    var _albums = [];
    for (let index = 0; index < images.length; index++) {
      const album = {
        src: this.imageLoadPath + images[index],
        caption: images[index],
        thumb: this.imageLoadPath + images[index]
      };
      _albums.push(album);
    }
    this._lightbox.open(_albums, 0);
  }

  /**
   * get all product of seller
   */
  getAllSellerProducts() {
    this.isDataLoading = this.isFirstTime ? true : false;
    var obj = {
      seller: window.localStorage.getItem('_id')
    };
    this.sellerProductService.getAllSellerProducts(obj).subscribe(data => {
      this.dataList = data.data;
      this.isDataLoading = false;
      this.isFirstTime = false;
      console.log(data.data);
    }, error => {
      this.dataList = [];
      this.isDataLoading = false;
      this.isFirstTime = false;
    });
  }


  /**
 * open new product add dialog
 */
  openAddDialog() {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      width: '1000px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.status) {
          this.getAllSellerProducts()
        }
      }
    });
  }

  /**
* logout confirm dialog
*/
  openBlockConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: "Please Confirm",
        msg: "Do you want to log out?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.status) {
          this.loginService.destroyAuth();
          this.router.navigateByUrl("/auth/login");
        }
      }
    });
  }

  /**
* open product bids view dialog
*/
  openBidViewDialog(row) {
    const dialogRef = this.dialog.open(BidViewDialogComponent, {
      width: '700px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.status) {
          this.getAllSellerProducts()
        }
      }
    });
  }


}
