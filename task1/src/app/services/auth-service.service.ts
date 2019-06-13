import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import axios from 'axios';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  addNewUser(userModel: User) {
    axios.post('http://localhost:3000/users', userModel)
      .then(res => {
        console.log(res);
      })
  }
  async login(userModel: User) {
    console.log("start");
    let isLoggedIn: boolean = false;
    let userFirstName: string;
    let userLastName: string;
    await axios.get('http://localhost:3000/users')
      .then(res => {
        let data = res;
        data.data.filter(user => {
          console.log(user.email, userModel.email, user.password, userModel.password)
          if (user.email == userModel.email && user.password == userModel.password) {
            isLoggedIn = true;
            userFirstName = user.firstName;
            userLastName = user.lastName;
            localStorage.setItem("userEmail", userModel.email);
            localStorage.setItem("userFirstName", userFirstName);
            localStorage.setItem("userLastName", userLastName);
            return;
          };
          return console.log(false);
        })
      })
    return isLoggedIn;
  }
  async isLoggedIn() {
    let isLoggedIn: boolean = false;
    let userEmail = localStorage.getItem("userEmail");
    if (userEmail !== null) {
      await axios.get('http://localhost:3000/users')
        .then(res => {
          let data = res;
          data.data.filter(user => {
            if (user.email == userEmail) {
              isLoggedIn = true;
            }
            return console.log(false);
          })
        })
    }

    return isLoggedIn;
  }
  logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
  }
  getAllUsers() {
    axios.get('http://localhost:3000/users')
      .then(res => {
        console.log(res);
      })
  }
}
