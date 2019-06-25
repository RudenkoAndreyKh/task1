import { Component, OnInit, Injectable, OnChanges } from '@angular/core';
import { UserInfoService } from '../services/user-info-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';
import { CartItem } from '../models/CartItem';
import { CartUpdateService } from '../services/cart-update.service';
import { AdminCheck } from '../services/admin-check.service';
import { filter } from 'rxjs/operators';
import { Extensions } from '../services/extensions.service';

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
  isLoggedIn = false;
  loggedAsAdmin = false;
  totalCost = 0;
  isAdmin = false;

  constructor(
    private router: Router,
    private adminCheck: AdminCheck,
    private userInfo: UserInfoService,
    private cartUpdate: CartUpdateService,
    private headerService: HeaderService,
    private authService: AuthServiceService,
    private ext:Extensions) {
    this.headerService.isUserLoggedInAnnounced$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    )
    this.adminCheck.isUserLoggedInAsAdminAnnounced$.subscribe(
      isAdmin => {
        this.loggedAsAdmin = isAdmin;
      }
    )
  }

  logout() {
    this.authService.logout();
    this.headerService.announcedisUserLoggedIn(false);
    return this.router.navigate(['login']);
  }

  ngOnInit() {
    this.userInfo.userInfoAnnounced$.subscribe(
      (user: User) => {
        this.userFirstName = user.firstName;
        this.userAvatar = user.image;
      });
    this.adminCheck.isUserLoggedInAsAdminAnnounced$.subscribe(
      isAdmin => {
        this.loggedAsAdmin = isAdmin;
      }
    )

    if (localStorage.userStatus == 'admin') this.isAdmin = true;
    this.adminCheck.announcedisUserLoggedInAsAdmin(this.isAdmin)

    if (localStorage.getItem('ShoppingCart') !== null) {
      this.cartItem = JSON.parse(localStorage.getItem('ShoppingCart'));
      for (let i = 0; i < this.cartItem.length; i++) {
        this.totalCost += this.cartItem[i].price * this.cartItem[i].quantity;
      }
    };
    this.cartUpdate.CartUpdateAnnounced$.subscribe(
      (cart: CartItem[]) => {
        this.cartItem = cart;
        let currCost = 0;
        for (let i = 0; i < this.cartItem.length; i++) {
          currCost += this.cartItem[i].price * this.cartItem[i].quantity;
        }
        this.totalCost = currCost;
      });
  }

  openUserInfo() {
    return this.router.navigate(['user-page']);
  }

  goToItemDetails(id) {
    return this.router.navigate([`game-details/${id}`]);
  }

  deleteItem(item) {
    event.stopPropagation();
    if (item.quantity > 1) {
      this.cartItem[this.ext.filterId(item, this.cartItem)].quantity -= 1;
      localStorage.setItem('ShoppingCart', JSON.stringify(this.cartItem));
      this.cartUpdate.announcedCartUpdate(this.cartItem);
      return;
    }
    this.cartItem.splice(this.ext.filterId(item, this.cartItem), 1);
    localStorage.setItem('ShoppingCart', JSON.stringify(this.cartItem));
    this.cartUpdate.announcedCartUpdate(this.cartItem);
  }

  clearAllCartItems() {
    localStorage.removeItem('ShoppingCart');
    this.cartItem = [];
    this.cartUpdate.announcedCartUpdate(this.cartItem);
  }

  goToOrder() {
    this.router.navigate(['order-page']);
  }

}
