import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { CartItem } from '../models/CartItem';

@Injectable({
    providedIn: 'root',
  })

export class CartUpdateService{
    
    private CartUpdateAnnouncedSource = new Subject<object>();
    CartUpdateAnnounced$ = this.CartUpdateAnnouncedSource;

    announcedCartUpdate(cartItemModel: CartItem[]){
        this.CartUpdateAnnouncedSource.next(cartItemModel);
    }
} 