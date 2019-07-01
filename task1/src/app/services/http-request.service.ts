import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Item } from '../models/Item';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  getUser(email) {
    return this.http.post(environment.domain + `/users/find-one-by-email`, { email });
  }

  getAllUsers() {
    return this.http.get(environment.domain + `/users/`);
  }

  getAllGames() {
    return this.http.get(environment.domain + `/games`);
  }

  getItemById(id) {
    return this.http.get(environment.domain + `/games/${id}/`);
  }

  deleteItem(id) {
    return this.http.delete(environment.domain + `/games/${id}`);
  }

  editItem(item: Item, id) {
    return this.http.put(environment.domain + `/games/${id}`, {
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });
  }

  addItem(item: Item) {
    return this.http.post(environment.domain + `/games/add-new-game`, {
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });

  }

  changeUserInfo(data) {
    return this.http.put(environment.domain + `/users/${data._id}`, data)
  }

}
