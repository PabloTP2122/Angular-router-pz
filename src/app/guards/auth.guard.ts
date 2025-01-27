import { Injectable } from '@angular/core';
//Para redirect
import { Router } from '@angular/router';

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';


import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* const token = this.tokenService.getToken();
    if (!token){
      //this.router.navigateByUrl('home');
      this.router.navigate(['home']);
      return false
    }
    return token ? true : false; */
    return this.authService.user$
    .pipe(
      map(user => {
        if(!user){
          this.router.navigate(['home']);
          return false;
        }
        return true;
      })
    )
  }

}
