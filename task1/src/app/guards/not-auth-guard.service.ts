import { AuthServiceService } from '../services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class NotAuthGuard implements CanActivate {


  constructor(private authService: AuthServiceService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let result = false;

    let userModel = JSON.parse(localStorage.getItem("userModel"));
    if (userModel) {
      result = true;
    }

    console.log(result);
    return result;
  }

}