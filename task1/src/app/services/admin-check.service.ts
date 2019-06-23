import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class AdminCheck {
    private isUserLoggedInAsAdmin = new Subject<boolean>();
    isUserLoggedInAsAdminAnnounced$ = this.isUserLoggedInAsAdmin;

    announcedisUserLoggedInAsAdmin(isUserLoggedInAsAdmin: boolean) {
        this.isUserLoggedInAsAdmin.next(isUserLoggedInAsAdmin)
    }
}