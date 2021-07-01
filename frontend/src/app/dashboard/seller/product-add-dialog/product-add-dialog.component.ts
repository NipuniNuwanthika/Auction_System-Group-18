import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageUploadService } from 'services/image-upload.service';
import { NotificationService } from 'services/notification.service';
import { SellerProductService } from 'services/seller-product.service';
import { URL_CONFIG } from '../../../../../config/urlConfig';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent implements OnInit {

  inputForm: FormGroup;
  isDataLoading: boolean = false;
  productCategories = [];
  suppliers = [];
  selectedImagesFiles: Array<File> = []; // image file holder for uploading
  progress: number = 0; // uploading progress
  urls = []; // based64 read urls
  imageLoadPath = URL_CONFIG.IMAGE_LOAD_URL;
  defaultImageIndex = -1;
  uploadedImagesList = [];

  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ProductAddDialogComponent>,
    private formBuilder: FormBuilder,
    private productService: SellerProductService,
    private imageUploadService: ImageUploadService,

  ) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({ // add form validation
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/), Validators.min(1)]],
      description: ['', []],
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


  async onFileSelected(event) {
    if (event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        if (event.target.files[index].type == 'image/jpeg' || event.target.files[index].type == 'image/png' || event.target.files[index].type == 'image/jpg') {
          this.selectedImagesFiles.push(event.target.files[index]);
          this.urls.push(await this.readFileAsDataURL(event.target.files[index]));
        } else {
          var msg = "Invalid file formats are removed from the selected list";
          this.notificationService.showErrorMsg("Sorry", msg, 5000);
        }
      }
    }
  }

  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });
    return result_base64;
  }

  removeImage(index) {
    if (this.defaultImageIndex == index) {
      this.defaultImageIndex = -1;
    }
    this.selectedImagesFiles.splice(index, 1);
    this.urls.splice(index, 1);
  }

  setDefaultImage(index) {
    this.defaultImageIndex = index;
  }

  async validateData() {
    if (this.selectedImagesFiles.length > 0) {
      if (this.defaultImageIndex != -1) {
        this.uploadedImagesList = [];
        this.uploadImages(0);
      } else {
        this.notificationService.showErrorMsg("Attention!", "Please select the default image", 5000);
      }
    } else {
      this.notificationService.showErrorMsg("Attention!", "Please select at least one image", 5000);
    }
  }

  uploadImages(currentUploadingIndex) {
    const formData = new FormData();
    formData.append('image', this.selectedImagesFiles[currentUploadingIndex]);
    this.isDataLoading = true;
    this.imageUploadService.uploadImage(formData).subscribe((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.isDataLoading = false;
          try {
            this.uploadedImagesList.push(event.body.data);
            if ((this.selectedImagesFiles.length - 1) == currentUploadingIndex) {
              this.save();
            } else {
              this.uploadImages(currentUploadingIndex + 1);
            }
          } catch (error) {
            this.notificationService.showErrorMsg("Sorry", "Something went wrong. Please try again", 5000);
          }
      }
    }
    );
  }

  save() {
    this.isDataLoading = true;
    var obj = this.inputForm.value;
    obj.default_image = this.defaultImageIndex;
    obj.images = this.uploadedImagesList;
    obj.seller = window.localStorage.getItem('_id');
    this.productService.new(obj).subscribe(data => {
      this.isDataLoading = false;
      this.notificationService.showSuccessMsg("Success", "New product added", 5000);
      this.dialogRef.close({ status: true });
    }, error => {
      this.isDataLoading = false;
      this.notificationService.showErrorMsg("Sorry", error.msg, 5000);
    });
  }

}
