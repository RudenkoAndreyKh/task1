import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  addNewUser(userModel: User) {
    axios.post('http://localhost:3000/users', userModel)
      .then(res => {
        localStorage.setItem("userEmail", userModel.email);
        localStorage.setItem("userFirstName", userModel.firstName);
        localStorage.setItem("userLastName", userModel.lastName);
        console.log("new user added", res);
      })
  }

  async login(userModel: User) {
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

  deleteUser(id) {
    axios.delete(`http://localhost:3000/users/${id}`)
  }

  deleteItem(id) {
    axios.delete(`http://localhost:3000/games/${id}`)
  }

  getAllUsers() {
    let data = {};
    axios.get('http://localhost:3000/users')
      .then(res => {
        data = res;
      })
  }

  async getAllGames() {
    let data = {};
    await axios.get('http://localhost:3000/games')
      .then(res => {
        data = res;
      })
    return <any>data;
  }

}
