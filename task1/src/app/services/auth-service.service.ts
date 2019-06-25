import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  addNewUser(userModel: User) {
    return axios.post(environment.domain + '/users', userModel);
  }

  async login() {
    return await axios.get(environment.domain + '/users')
  }

  async isLoggedIn() {
    let isLoggedIn: boolean = false;
    let userModel = JSON.parse(localStorage.getItem("userModel"));
    if (userModel !== null) {
      let userEmail = userModel.userEmail;

      await axios.get(environment.domain + '/users')
        .then(res => {
          let data = res;
          data.data.filter(user => {
            if (user.email == userEmail) {
              isLoggedIn = true;
            }
          })
        })
    }
    return isLoggedIn;
  }

  logout() {
    localStorage.removeItem("userModel");
    localStorage.removeItem("ShoppingCart");
  }

  deleteUser(id) {
    return axios.delete(environment.domain + `/users/${id}`)
  }

}
