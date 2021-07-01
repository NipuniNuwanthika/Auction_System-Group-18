import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private apiService: ApiService) { }


  placeABid(data): Observable<any> {
    return this.apiService.post('bid', data)
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }


  getBidByBuyer(data): Observable<any> {
    return this.apiService.post('bid/get-by-buyer', data)
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }

  getBidBySellerProduct(data): Observable<any> {
    return this.apiService.post('bid/get-by-seller-product', data)
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }


  closeBid(data): Observable<any> {
    return this.apiService.post('bid/close', data)
      .pipe(map(
        data => {
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }

 
  pyaForBid(data): Observable<any> {
    return this.apiService.post('bid/pay-for-bid', data)
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
