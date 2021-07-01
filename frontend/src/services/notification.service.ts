import { Injectable } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private iziToast: Ng2IzitoastService,
  ) { }

  showErrorMsg(title: string, msg: string, timeout: number) {
    this.iziToast.error(
      {
        title: title,
        message: msg,
        timeout: timeout,
        position: "topLeft",
        overlay: true,
        overlayClose: true,
      });
  }

  showSuccessMsg(title: string, msg: string, timeout: number) {
    this.iziToast.success(
      {
        title: title,
        message: msg,
        timeout: timeout,
        position: "topLeft",
        overlay: true,
        overlayClose: true
      });
  }

  showInfoMsg(title: string, msg: string, timeout: number) {
    this.iziToast.info(
      {
        title: title,
        message: msg,
        timeout: timeout,
        position: "topLeft",
        overlay: true,
        overlayClose: true,
        close: true,
      });
  }
}
