import { Component, OnInit, Injectable, OnChanges } from '@angular/core';
import { UserInfoService } from '../services/user-info-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';
import { CartItem } from '../models/CartItem';
import {CartUpdateService} from '../services/cart-update.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  userFirstName = "";
  userAvatar = '';
  shoppingCart = false;
  cartItem: CartItem[] = [];


  constructor(private router: Router, private userInfo: UserInfoService, private cartUpdate: CartUpdateService, private headerService: HeaderService, private Auth: AuthServiceService) {
    
  }

  logout() {
    this.Auth.logout();
    this.headerService.announcedisUserLoggedIn(false);
    return this.router.navigate(['login']);
  }

  ngOnInit() {
    this.userInfo.userInfoAnnounced$.subscribe(
      (user: User) => {
        this.userFirstName = user.firstName;
        this.userAvatar = user.image;
        console.log(this.userAvatar);
      });

    if (localStorage.getItem('ShoppingCart') !== null) {
      this.cartItem = JSON.parse(localStorage.getItem('ShoppingCart'));
    };

    this.cartUpdate.CartUpdateAnnounced$.subscribe(
      (cart: CartItem[]) => {
        this.cartItem = cart;
      });
  }

  openUserInfo(){
    return this.router.navigate(['user-page']);
  }

  goToItemDetails(id){
    this.router.navigate([`game-details/${id}`]);
  }

  deleteItem(item) {
    if (item.quantity > 1) {
      this.cartItem[this.filterId(item, this.cartItem)].quantity -= 1;
      localStorage.setItem('ShoppingCart', JSON.stringify(this.cartItem));
      return;
    }
    this.cartItem.splice(this.filterId(item, this.cartItem), 1);
    localStorage.setItem('ShoppingCart', JSON.stringify(this.cartItem));
  }

  clearAllCartItems(){
    event.stopPropagation();
    localStorage.removeItem('ShoppingCart');
    this.cartItem = [];
  }

  goToOrder(){
    this.router.navigate(['order-page']);
  }

  filterId(item, data) {
    let result: number;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == item.id) result = i;
    }
    return result;
  }

}
