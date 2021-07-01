import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class SellerProductService {

  constructor(private apiService: ApiService) { }

  /**
* get all seller products
* @param data
*/
  getAllSellerProducts(data): Observable<any> {
    return this.apiService.post('product/get-by-seller', data)
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }

 
  getAll(): Observable<any> {
    return this.apiService.get('product/get-all')
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }


  new(data): Observable<any> {
    return this.apiService.post('product', data)
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }

  /**
* update the record

*/
  update(data): Observable<any> {
    return this.apiService.put('product', data)
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }

  /**
* delete the record permanently
*/
  delete(params): Observable<any> {
    return this.apiService.delete('product/' + params)
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
