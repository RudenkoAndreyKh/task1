import { Component, OnInit } from '@angular/core';
import { Item } from '../models/Item';
import { CartItem } from '../models/CartItem';
import { CartUpdateService } from '../services/cart-update.service';
import { Extensions } from '../services/extensions.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { HttpRequestService } from '../services/http-request.service';
import { HeaderService } from '../services/header-service';


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
  isSpinnerRun = true;
  isLoggedIn = false;

  isFilteredItemsNull: boolean = false;
  constructor(
    private router: Router,
    private httpReq: HttpRequestService,
    private cartUpdate: CartUpdateService,
    private ext: Extensions,
    private http: HttpClient,
    private headerService:HeaderService) {

  }

  async ngOnInit() {
    this.headerService.isUserLoggedInAnnounced$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    )
    await this.httpReq.getAllGames()
      .subscribe((res: Item[]) => {
        this.items = res;
        this.data = res;
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
        if (!this.filteredItems[0]) {
          this.isFilteredItemsNull = true;
        }
        if (!this.searchItems.value) {
          this.items = this.data;
          this.isFilteredItemsNull = false;
          return;
        }
        this.items = this.filteredItems;
      });
      this.isSpinnerRun = false;
  }

  addToCart(item: CartItem) {
    event.stopPropagation()
    if (localStorage.getItem('ShoppingCart') == null) {
      this.cartItem = [];
    }
    if (localStorage.getItem('ShoppingCart') !== null) {
      this.cartItem = JSON.parse(localStorage.getItem('ShoppingCart'));
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
    this.router.navigate([`/game-details/${item.id}`])
    .then(() =>{
      console.log("next");
      this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
    });
  }

}
