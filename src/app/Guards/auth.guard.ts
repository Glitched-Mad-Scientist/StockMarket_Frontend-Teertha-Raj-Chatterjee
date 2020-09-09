import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private service:AccountService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
      Observable<boolean | UrlTree> | 
      Promise<boolean | UrlTree> | 
      boolean | UrlTree {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
