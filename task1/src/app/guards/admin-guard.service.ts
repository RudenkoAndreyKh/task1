import { AuthServiceService } from '../services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    isAdmin: string;

    constructor(private _authService: AuthServiceService, private _router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        this.isAdmin = localStorage.userStatus;
        if (this.isAdmin != 'admin') {
            this._router.navigate(['/']);
            return this.isAdmin == 'admin';
        }
        return this.isAdmin == 'admin';
    }

}