import { Injectable } from '@angular/core';
import axios from 'axios';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  getAllUsers() {
    let data = {};
    axios.get('http://localhost:3000/users')
      .then(res => {
        data = res;
      })
      return <any>data;
  }

  getAllGames() {
    let data = {};
    axios.get('http://localhost:3000/games')
      .then(res => {
        data = res;
      })
      return <any>data;
  }

  editItem(item: FormGroup, id){
    axios.put(`http://localhost:3000/games/${id}/`, {
      name: item.value.name,
      price: item.value.price,
      image: item.value.image,
      description: item.value.description
    })
    .then(res => {
      console.log(res);
    })
  }

  addItem(item: FormGroup){
    axios.post(`http://localhost:3000/games`, {
      name: item.value.name,
      price: item.value.price,
      image: item.value.image,
      description: item.value.description
    })
    .then(res => {
      console.log(res);
    })
  }

}
