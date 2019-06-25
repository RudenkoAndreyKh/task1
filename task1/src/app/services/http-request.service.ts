import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Item } from '../models/Item';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  test() {
    return this.http.get(environment.domain + '/games');
  }

  getAllUsers() {
    return this.http.get<User[]>(environment.domain + '/users');
    //return await axios.get(environment.domain + '/users');
  }

  async getAllGames() {
    return await axios.get(environment.domain + '/games');
  }

  async getUserById(id) {
    return await axios.get(environment.domain + `/games/${id}/`)
  }

  deleteItem(id, data) {
    return axios.delete(environment.domain + `/games/${id}/`);
  }

  async editItem(item: Item, id) {
    return await axios.put(environment.domain + `/games/${id}/`, {
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });
  }

  addItem(item: Item) {
    return axios.post(environment.domain + `/games`, {
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });

  }

  async changeUserInfo(data) {
    return await axios.put(environment.domain + `/users/${data.id}`, data)
  }

}
