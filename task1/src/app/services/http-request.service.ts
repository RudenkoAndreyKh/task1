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
  }

  getAllGames() {
    return this.http.get(environment.domain + '/games');
    // return this.http.get(environment.domain + '/gamess');
  }

  getUserById(id) {
    return this.http.get(environment.domain + `/games/${id}/`);
  }

  deleteItem(id, data) {
    return this.http.delete(environment.domain + `/games/${id}/`);
  }

  editItem(item: Item, id) {
    return this.http.put(environment.domain + `/games/${id}/`, {
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });
  }

  addItem(item: Item) {
    return this.http.post(environment.domain + `/games`, {
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });

  }

  changeUserInfo(data) {
    return this.http.put(environment.domain + `/users/${data.id}`, data)
  }

}
