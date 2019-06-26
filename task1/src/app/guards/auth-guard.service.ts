import { AuthServiceService } from '../services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthServiceService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let result = true;
    this.authService.isLoggedIn().subscribe((res: User[]) => {
      let userModel = JSON.parse(localStorage.getItem("userModel"));
      if(userModel){
        res.map(user =>{
          if(user.email === userModel.userEmail){
            result = false;
            this._router.navigate(['']);
          }
        })
      }
    })
    return result;
  }

}