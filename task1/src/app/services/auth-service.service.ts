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
    let userEmail = localStorage.getItem("userEmail");
    if (userEmail !== null) {
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
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("ShoppingCart");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("userStatus");
  }

  deleteUser(id) {
    return axios.delete(environment.domain + `/users/${id}`)
  }

}
