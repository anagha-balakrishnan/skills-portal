import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedIn = false;
  constructor(private commonService: CommonService) {
    this.commonService.getLoggedInUser();
    this.commonService.loggedInUserStream$
      .subscribe(x => {
        this.loggedIn = x ? true : false;
      });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loggedIn;
  }

}
