import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  addNewUser(userModel: User) {
    axios.post(environment.domain + '/users', userModel)
      .then(res => {
        localStorage.setItem("userEmail", userModel.email);
        localStorage.setItem("userFirstName", userModel.firstName);
        localStorage.setItem("userLastName", userModel.lastName);
        localStorage.setItem("userAvatar", userModel.image);
      })
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

  isAdmin() {
    return axios.get(environment.domain + '/users')
  }

  logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("ShoppingCart");
    localStorage.removeItem("userAvatar");
  }

  deleteUser(id) {
    return axios.delete(environment.domain + `/users/${id}`)
  }

}
