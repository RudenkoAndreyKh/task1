import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  addNewUser(firstName: FormControl, secondName: FormControl, email: FormControl, password: FormControl ) {
    const body = {
      firstName: firstName,
      secondName: secondName,
      email: email,
      password: password
    };
    axios.post('http://localhost:3000/users', body)
    .then(res => {
      console.log(res);
    })
  }
  getAllUsers(){
    axios.get('http://localhost:3000/users')
    .then(res => {
      console.log(res);
    })
  }
}
