import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Item } from '../models/Item';
import { CartItem } from '../models/CartItem';
import { CartUpdateService } from '../services/cart-update.service';
import { Extensions } from '../services/extensions.service';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import axios from 'axios';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { HttpRequestService } from '../services/http-request.service';


@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  searchItems = new FormControl();
  filteredItems: any;
  isLoading = false;
  errorMsg: string;

  data: Item[] = [];
  items: Item[] = [];
  cartItem: CartItem[] = [];
  currItem: Item;

  isFilteredItemsNull: boolean = false;
  constructor(private router: Router, private httpReq: HttpRequestService, private authService: AuthServiceService, private cartUpdate: CartUpdateService, private ext: Extensions, private http: HttpClient) {

  }

  async ngOnInit() {
    await this.httpReq.getAllGames()
      .then(res => {
        this.items = res.data;
        this.data = res.data;
      })
    this.searchItems.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredItems = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(environment.domain + `/games`)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(res => {
        let data = <any>res;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name.toLowerCase().includes(this.searchItems.value)) {
            this.filteredItems.push(data[i]);
          }
        }
        if (this.filteredItems[0] == undefined) {
          this.isFilteredItemsNull = true;
        }
        if (this.searchItems.value == '') {
          this.items = this.data;
          this.isFilteredItemsNull = false;
          return;
        }

        this.items = this.filteredItems;
      });
  }

  addToCart(item: CartItem) {
    event.stopPropagation()
    if (localStorage.getItem('ShoppingCart') == null) {
      this.cartItem = [];
    }
    if (localStorage.getItem('ShoppingCart') !== null) {
      this.cartItem = JSON.parse(localStorage.getItem('ShoppingCart'));
    }
    if (localStorage.getItem('ShoppingCart') !== null) {
      let data = JSON.parse(localStorage.getItem('ShoppingCart'));
      if (this.ext.filterId(item, data) + 1) {
        this.cartItem = JSON.parse(localStorage.getItem('ShoppingCart'));
        this.cartItem[this.ext.filterId(item, data)].quantity += 1;
        localStorage.setItem('ShoppingCart', JSON.stringify(this.cartItem));
        this.cartUpdate.announcedCartUpdate(this.cartItem);
        return;
      }
    }
    item.quantity = 1;

    this.cartItem.push(item);
    localStorage.setItem('ShoppingCart', JSON.stringify(this.cartItem));
    this.cartUpdate.announcedCartUpdate(this.cartItem);

  }

  goToGameDetails(item) {
    this.router.navigate([`/game-details/${item.id}`]);
  }

}
