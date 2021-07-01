import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BidService } from 'services/bid.service';
import { NotificationService } from 'services/notification.service';
import { SellerProductService } from 'services/seller-product.service';

@Component({
  selector: 'app-bid-dialog',
  templateUrl: './bid-dialog.component.html',
  styleUrls: ['./bid-dialog.component.css']
})
export class BidDialogComponent implements OnInit {
  inputForm: FormGroup;
  isDataLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bidService: BidService,
    private dialogRef: MatDialogRef<BidDialogComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public dataFromParentComponent: any,
  ) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({ // add form validation
      price: ['', [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),Validators.min(1)]],
    });
  }


  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  /**
   * close opened dialog
   */
  closeDialog() {
    this.dialogRef.close({ status: false })
  }

  save() {
    if (this.inputForm.get('price').value > this.dataFromParentComponent.price) {
      this.isDataLoading = true;
      var obj = this.inputForm.value;
      obj.buyer = window.localStorage.getItem('_id');
      obj.seller = this.dataFromParentComponent.seller;
      obj.product = this.dataFromParentComponent._id;
      this.bidService.placeABid(obj).subscribe(data => {
        this.isDataLoading = false;
        this.notificationService.showSuccessMsg("Success", "Your bid place successfully", 5000);
        this.dialogRef.close({ status: true , price : this.inputForm.get('price').value});
      }, error => {
        this.isDataLoading = false;
        this.notificationService.showErrorMsg("Sorry", error.msg, 8000);
      });
    }else { 
      this.notificationService.showErrorMsg("Sorry", "Your bid price should be greater than the min bid price", 8000);
    }
  }

}
