import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from 'services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NotificationService } from 'services/notification.service';
import { Ng2IziToastModule } from 'ng2-izitoast'
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageUploadService } from 'services/image-upload.service';
import { LightboxModule } from 'ngx-lightbox';
import { ApiService } from 'services/api-service.service';
import { JwtService } from 'services/jwt-service.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner'


@NgModule({
  declarations: [FieldErrorDisplayComponent, ConfirmDialogComponent, FooterComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    Ng2IziToastModule,
    MatDialogModule,
    NgxPaginationModule,
    LightboxModule,
    Ng2LoadingSpinnerModule

  ],
  exports: [
    FieldErrorDisplayComponent,
    ConfirmDialogComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2IziToastModule,
    NgxPaginationModule,
    Ng2LoadingSpinnerModule
  ],
  providers: [
    ApiService,
    JwtService,
    AuthGuardService,
    NotificationService,
    ImageUploadService,
    AuthGuardService
  ]
})
export class SharedModule { }
