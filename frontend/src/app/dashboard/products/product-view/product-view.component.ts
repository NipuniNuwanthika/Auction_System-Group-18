import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { NotificationService } from 'services/notification.service';
import { SellerProductService } from 'services/seller-product.service';
import { URL_CONFIG } from '../../../../../config/urlConfig';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  isDataLoading: boolean = false;
  isFirstTime = true;
  dataList = [];
  imageLoadPath = URL_CONFIG.IMAGE_LOAD_URL;
  userId = window.localStorage.getItem("_id");
  type = window.localStorage.getItem('type');

  constructor(
    private sellerProductService: SellerProductService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog,
    private _lightbox: Lightbox,
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
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

  getAllProduct() {
    this.isDataLoading = this.isFirstTime ? true : false;;
    this.sellerProductService.getAll().subscribe(data => {
      this.dataList = data.data;
      this.isDataLoading = false;
      this.isFirstTime = false;
    }, error => {
      this.dataList = [];
      this.isDataLoading = false;
      this.isFirstTime = false;
    });
  }

  placeBid(row, index) {
    if (this.userId != null && this.userId != undefined && this.userId != "null" && this.userId.length == 24) {
      if (this.type == "buyer") {
        this.openBidAddDialog(row, index);
      } else {
        this.notificationService.showErrorMsg("Sorry", "Please login to your buyer account to place a bid", 5000);
        this.router.navigateByUrl("/auth/login");
      }
    } else {
      this.notificationService.showErrorMsg("Sorry", "Please login to your buyer account to place a bid", 5000);
      this.router.navigateByUrl("/auth/login");
    }
  }

  /**
* place a bid
*/
  openBidAddDialog(row, index) {
    const dialogRef = this.dialog.open(BidDialogComponent, {
      width: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.status) {
          this.getAllProduct();
        }
      }
    });
  }

}
