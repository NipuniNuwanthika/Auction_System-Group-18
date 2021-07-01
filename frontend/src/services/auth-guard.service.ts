import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isUserLogged: boolean = false;
  token: any
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var user_id = window.localStorage['_id'];
    var type = window.localStorage['type'];
    if (user_id != null && user_id != undefined && user_id != "null" && user_id.length == 24) {
      if (route.data.type == type) {
        return true;
      } else {
        this.router.navigateByUrl('/auth/login');
        return false;
      }
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }

}
