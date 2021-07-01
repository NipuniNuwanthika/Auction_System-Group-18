import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(
    private apiService: ApiService,
  ) { }
 
  uploadImage(formData) {
    return this.apiService.postFormData('images/upload', formData)
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }
}
