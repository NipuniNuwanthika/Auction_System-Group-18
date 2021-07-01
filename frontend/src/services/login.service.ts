import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';
import { Observable, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtService } from './jwt-service.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLogged = false;
  constructor(private apiService: ApiService, private jwtService: JwtService) {
  }


  attemptLogin(credentials): Observable<any> {
    this.destroyAuth();
    return this.apiService.post('user/login', credentials)
      .pipe(map(
        data => {
          this.setAuth(data);
          this.jwtService.saveInfo(data.data);
          return data;
        }
      ),
        catchError(res => {
          throw (res);
        }));
  }


  setAuth(user) {
    this.jwtService.saveToken(user.token.token);
    this.isLogged = true;
  }

  /**
   * Remove JWT from localstorage
   */
  destroyAuth() {
    this.jwtService.destroyToken();
    window.localStorage.clear();
    this.isLogged = false;
  }


}
