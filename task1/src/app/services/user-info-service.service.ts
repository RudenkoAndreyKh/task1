import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root',
  })

export class UserInfoService{
    private userInfoAnnouncedSource = new Subject<object>();
    userInfoAnnounced$ = this.userInfoAnnouncedSource;

    announcedUserInfo(userModel:User){
        this.userInfoAnnouncedSource.next(userModel)
    }
} 