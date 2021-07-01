import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BidService } from 'services/bid.service';
import { NotificationService } from 'services/notification.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  inputForm: FormGroup;
  isDataLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bidService: BidService,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public dataFromParentComponent: any,
  ) { }

  ngOnInit(): void {
    console.log(this.dataFromParentComponent);
    this.inputForm = this.formBuilder.group({ // add form validation
      account_number: ['', [Validators.required]],
      bank: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      name: ['', [Validators.required]],
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
    this.isDataLoading = true;
    this.bidService.pyaForBid({ bid_id: this.dataFromParentComponent._id }).subscribe(data => {
      this.isDataLoading = false;
      this.notificationService.showSuccessMsg("Success", "Payment success.", 5000);
      this.dialogRef.close({ status: true });
    }, error => {
      this.isDataLoading = false;
      this.notificationService.showErrorMsg("Sorry", error.msg, 8000);
    });

  }

}
