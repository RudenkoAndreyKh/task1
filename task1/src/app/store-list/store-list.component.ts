import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Item } from '../models/Item';
import { CartItem } from '../models/CartItem';
import {CartUpdateService} from '../services/cart-update.service';
import { Extensions } from '../services/extensions.service';


@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  items: Item[] = [];
  cartItem: CartItem[] = [];
  constructor(private Auth: AuthServiceService, private cartUpdate: CartUpdateService, private ext:Extensions) {

  }

  async ngOnInit() {
    await this.Auth.getAllGames()
      .then(res => {
        this.items = res.data;
      })
  }

  addToCart(item: CartItem) {
    if (localStorage.getItem('ShoppingCart') !== null) {
      this.cartItem = JSON.parse(localStorage.getItem('ShoppingCart'));
    }
    if (localStorage.getItem('ShoppingCart') !== null) {
      let data = JSON.parse(localStorage.getItem('ShoppingCart'));
      if (this.ext.filterId(item, data) + 1) {
        console.log("id already exist");
        this.cartItem = JSON.parse(localStorage.getItem('ShoppingCart'));
        this.cartItem[this.ext.filterId(item, data)].quantity += 1;
        localStorage.setItem('ShoppingCart', JSON.stringify(this.cartItem));
        this.cartUpdate.announcedCartUpdate(this.cartItem);
        return;
      }
    }
    item.quantity = 1;
    console.log("item created", item);
    this.cartItem.push(item);
    localStorage.setItem('ShoppingCart', JSON.stringify(this.cartItem));
    this.cartUpdate.announcedCartUpdate(this.cartItem);
  }

}
