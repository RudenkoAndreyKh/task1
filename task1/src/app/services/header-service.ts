import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class HeaderService{
    private isUserLoggedIn = new Subject<boolean>();
    isUserLoggedInAnnounced$ = this.isUserLoggedIn;

    announcedisUserLoggedIn(isUserLoggedIn:boolean){
        this.isUserLoggedIn.next(isUserLoggedIn)
    }
} 