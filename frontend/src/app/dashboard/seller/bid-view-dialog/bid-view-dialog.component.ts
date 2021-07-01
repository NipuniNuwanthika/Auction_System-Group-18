import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { BidService } from 'services/bid.service';
import { NotificationService } from 'services/notification.service';

@Component({
  selector: 'app-bid-view-dialog',
  templateUrl: './bid-view-dialog.component.html',
  styleUrls: ['./bid-view-dialog.component.css']
})
export class BidViewDialogComponent implements OnInit {

  isDataLoading: boolean = false;
  dataList = [];

  constructor(
    private bidService: BidService,
    private dialogRef: MatDialogRef<BidViewDialogComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public dataFromParentComponent: any,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllBidOfProduct();
  }

  getAllBidOfProduct() {
    this.isDataLoading = true;
    var obj = {
      seller: window.localStorage.getItem('_id'),
      product: this.dataFromParentComponent._id
    };
    this.bidService.getBidBySellerProduct(obj).subscribe(data => {
      this.dataList = data.data;
      this.isDataLoading = false;
    }, error => {
      this.dataList = [];
      this.isDataLoading = false;
    });
  }


  /**
   * close opened dialog
   */
  closeDialog() {
    this.dialogRef.close({ status: false })
  }


  /**
* open bid choose and close dialog
*/
  openBidCloseConfirmDialog(row) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: "Please Confirm",
        msg: "Do you want to choose this bid price and close the session?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.status) {
          this.dialogRef.close({ status: true });
          this.chooseAndCloseBid(row);
        }
      }
    });
  }



  chooseAndCloseBid(row) {
    this.isDataLoading = true;
    var obj = {
      product: this.dataFromParentComponent._id,
      bid_id: row._id
    }
    this.bidService.closeBid(obj).subscribe(data => {
      this.isDataLoading = false;
      this.notificationService.showSuccessMsg("Success", "Bid close successfully. Waiting for payment", 5000);
      this.dialogRef.close({ status: true });
    }, error => {
      this.isDataLoading = false;
      this.notificationService.showErrorMsg("Sorry", error.msg, 8000);
    });

  }

}
