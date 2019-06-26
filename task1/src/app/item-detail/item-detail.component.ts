import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Item } from '../models/Item';
import { HttpRequestService } from '../services/http-request.service';
import { AuthServiceService } from '../services/auth-service.service';
import { HeaderService } from '../services/header-service';
import { CartItem } from '../models/CartItem';
import { Extensions } from '../services/extensions.service';
import { CartUpdateService } from '../services/cart-update.service';
import { User } from '../models/User';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  isLoggedIn = false;
  cartItem: CartItem[] = [];
  private id: number;
  private routeSubscription: Subscription;
  isSpinnerRun: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartUpdate: CartUpdateService,
    private ext: Extensions,
    private headerService: HeaderService,
    private authService: AuthServiceService,
    private httpReq: HttpRequestService) {
    this.routeSubscription = route.params.subscribe((params: Item) => {
      this.id = params['id'];
    });
    this.headerService.isUserLoggedInAnnounced$.subscribe(
      isLoggedIn => {
        console.log("sub");
        this.isLoggedIn = isLoggedIn;
      }
    )

  }

  async ngOnInit() {

    await this.httpReq.getUserById(this.id).subscribe((res: Item) => {
      this.item = res;
      this.isSpinnerRun = false;
    })
  }

  addToCart(item: CartItem) {
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

}
