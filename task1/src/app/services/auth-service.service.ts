import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  addNewUser(userModel: User) {
    return this.http.post(environment.domain + `/auth/create-new-user`, userModel);
    //return this.http.post(environment.domain + '/users', userModel);
  }

  login(userModel) {
    return this.http.post(environment.domain + `/auth/sign-in`, userModel);
  }

  isLoggedIn(userModel) {
    return this.http.post<any>(environment.domain + `/auth/is-logged-in`, userModel);
  }

  isTokenExpired(tokenExpiresIn) {
    if (tokenExpiresIn) {
      const date = new Date();
      const currTime = date.getTime();
      if (currTime > +tokenExpiresIn) {
        return true;
      }
      else
        return false;
    }
  }

  logout() {
    localStorage.removeItem("userModel");
    localStorage.removeItem("ShoppingCart");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiresIn");
  }

  deleteUser(id) {
    return this.http.delete(environment.domain + `/users/${id}`);
  }

}
