import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  constructor() { }

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  saveInfo(data) {
    window.localStorage['first_name'] = data.first_name;
    window.localStorage['last_name'] = data.last_name;
    window.localStorage['phone'] = data.phone;
    window.localStorage['email'] = data.email;
    window.localStorage['address'] = data.address;
    window.localStorage['type'] = data.type;
    window.localStorage['_id'] = data._id;
  }

  destroyToken() {
    window.localStorage.clear();
  }
}
