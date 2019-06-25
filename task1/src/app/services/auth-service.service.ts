import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  addNewUser(userModel: User) {
    return this.http.post(environment.domain + '/users', userModel);
  }

  login() {
    return this.http.get(environment.domain + '/users');
  }

  isLoggedIn() {
    return this.http.get(environment.domain + '/users');
  }

  logout() {
    localStorage.removeItem("userModel");
    localStorage.removeItem("ShoppingCart");
  }

  deleteUser(id) {
    return this.http.delete(environment.domain + `/users/${id}`);
  }

}
