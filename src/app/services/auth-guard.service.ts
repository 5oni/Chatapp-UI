import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CommonApiService } from './common-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  jwtHelper = new JwtHelperService()

  constructor(
    private router: Router,
    private sharedService: CommonApiService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.sharedService.isUserLoggedIn()) {
      this.router.navigate(['auth'])
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.sharedService.isUserLoggedIn()) {
      this.router.navigate(['auth'])
      return false;
    }
    return true;
  }

}
