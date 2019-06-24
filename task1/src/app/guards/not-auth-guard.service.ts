import { AuthServiceService } from '../services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class NotAuthGuard implements CanActivate {


  constructor(private _authService: AuthServiceService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.isLoggedIn().then(res => {
      if (res) {
        console.log("ne", res);
        return true;
      }
      console.log("da", res);
      this._router.navigate(['']);
      return res;
    })
  }

}