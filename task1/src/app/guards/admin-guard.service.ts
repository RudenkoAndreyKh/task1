import { AuthServiceService } from '../services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    isAdmin = false;

    constructor(private _authService: AuthServiceService, private _router: Router) {

    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        this.check();
        if (this.isAdmin == false) {
            this._router.navigate(['/']);
            return this.isAdmin;
        }

        return this.isAdmin;
    }

    async check() {
        await this._authService.isAdmin()
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].status != undefined && res.data[i].email == localStorage.userEmail) {
                        this.isAdmin = true;
                        break;
                    };
                }

            })
    }

}