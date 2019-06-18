import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Item } from '../models/Item';
import {CartItem} from '../models/CartItem';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  items: Item[] = [];
  cartItem: CartItem[] = [];
  constructor(private Auth: AuthServiceService) {
    
  }

  async ngOnInit() {
    await this.Auth.getAllGames()
      .then(res => {
        this.items = res.data;
      })
  }

  addToCart(item){  
    this.cartItem = item;
    localStorage.setItem(`${item.name}`, <any>this.cartItem);
  }

}
