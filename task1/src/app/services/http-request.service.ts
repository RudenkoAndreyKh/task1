import { Injectable } from '@angular/core';
import axios from 'axios';
import { FormGroup } from '@angular/forms';
import {environment} from '../../environments/environment';
import { Extensions } from './extensions.service';
import { TableUpdateService } from './update-table.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private ext:Extensions, private updateTable:TableUpdateService){

  }

  async getAllUsers() {
    return await axios.get(environment.domain+'/users');
  }

  async getAllGames() {
    return await axios.get(environment.domain+'/games');
  }

  async getUserById(id){
    return await axios.get(environment.domain+`/games/${id}/`)
  }

  deleteItem(id, data){
    return axios.delete(environment.domain+`/games/${id}/`);
  }

  async editItem(item: FormGroup, id){
    return await axios.put(environment.domain+`/games/${id}/`, {
      name: item.value.name,
      price: item.value.price,
      image: item.value.image,
      description: item.value.description
    });
  }

  addItem(item: FormGroup){
    return axios.post(environment.domain+`/games`, {
      name: item.value.name,
      price: item.value.price,
      image: item.value.image,
      description: item.value.description
    });
    
  }

  async changeUserInfo(data){
    return await axios.put(environment.domain+`/users/${data.id}`, data)
  }

}
