import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';
import { CartItem } from '../models/CartItem';
import { CartUpdateService } from '../services/cart-update.service';
import { Extensions } from '../services/extensions.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  isLoggedIn = false;
  cartItem: CartItem[] = [];
  shoppingCart = false;
  totalCost = 0;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private headerService: HeaderService,
    private cartUpdate: CartUpdateService,
    private ext: Extensions) { }

  async ngOnInit() {
    await this.authService.isLoggedIn().then(res => {
      this.isLoggedIn = res;
    })
    if (!this.isLoggedIn) {
      this.router.navigate(['login']).then(() => {
        this.headerService.announcedisUserLoggedIn(this.isLoggedIn);
      });
    }
    this.headerService.announcedisUserLoggedIn(this.isLoggedIn);


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

  goToItemDetails(id) {
    this.router.navigate([`game-details/${id}`]);
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
    event.stopPropagation();
    localStorage.removeItem('ShoppingCart');
    this.cartItem = [];
    this.cartUpdate.announcedCartUpdate(this.cartItem);
  }

}
