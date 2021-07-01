import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private apiService: ApiService,
  ) { }

  /**
  * user sign up
  */
  new(data): Observable<any> {
    return this.apiService.post('user', data)
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
