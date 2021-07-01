import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { Lightbox } from 'ngx-lightbox';
import { BidService } from 'services/bid.service';
import { LoginService } from 'services/login.service';
import { URL_CONFIG } from '../../../../../config/urlConfig';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent implements OnInit {
  isDataLoading: boolean = false;
  dataList = [];
  imageLoadPath = URL_CONFIG.IMAGE_LOAD_URL;

  constructor(
    private dialog: MatDialog,
    private bidService: BidService,
    private _lightbox: Lightbox,
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.getAllBuyerBid();
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
   * get all buyer bids
   */
  getAllBuyerBid() {
    this.isDataLoading = true;
    var obj = {
      buyer: window.localStorage.getItem('_id')
    };
    this.bidService.getBidByBuyer(obj).subscribe(data => {
      this.dataList = data.data;
      this.isDataLoading = false;
    }, error => {
      this.dataList = [];
      this.isDataLoading = false;
    });
  }

    /**
* logout confirm dialog
*/
openBlockConfirmDialog() {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: {     ////if you want to share data with your dialog, you can use the data option to pass information to the dialog component.
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
 * open payment dialog
 */
   openAddDialog(row) {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data : row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.status) {
          this.getAllBuyerBid()
        }
      }
    });
  }


}
