import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  addNewUser(userModel: User) {
    return this.http.post(environment.domain + `/authentication/signUp`, userModel);
    //return this.http.post(environment.domain + '/users', userModel);
  }

  login(userModel) {
    return this.http.post(environment.domain + `/authentication/signIn`, userModel);
  }

  isLoggedIn(userModel) {
    return this.http.post<any>(environment.domain + `/authentication/isLoggedIn`, userModel);
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
