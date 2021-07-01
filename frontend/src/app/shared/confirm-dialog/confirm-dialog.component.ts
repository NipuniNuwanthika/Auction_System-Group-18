import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  successTitle: String;
  msg: String;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromParentComponent: any) { }      //To access the data in your dialog component you have to use the MAT_DIALOG_DATA injection token



  ngOnInit() {
    this.successTitle = this.dataFromParentComponent.title;
    this.msg = this.dataFromParentComponent.msg;
  }

  /**
 * close d
 */
  close() {
    this.dialogRef.close({ status: false });
  }

  /**
   * do things when press confirm
   */
  confirm() {
    this.dialogRef.close({ status: true })
  }
}
