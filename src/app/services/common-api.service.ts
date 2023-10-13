import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  public currentUser: any;
  public isUserLogin = false;
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    public _route: Router,

  ) { }


  public setUserLoggedIn(data: any): void {
    this.currentUser = data.user;
    window.localStorage.setItem('_u', JSON.stringify(data.user));
    window.localStorage.setItem('token', data.token);
    this.isLoggedIn.next(true);
  }

  public isUserLoggedIn(): Boolean {
    let user = window.localStorage.getItem('_u');
    let token = window.localStorage.getItem('token');
    this.currentUser = (user) ? JSON.parse(user) : {};
    if (Object.keys(this.currentUser).length && token) {
      this.isLoggedIn.next(true);
      return true;
    }
    this.isLoggedIn.next(false);
    return false;
  }

  public getToken(): any {
    return window.localStorage.getItem('token');
  }
  public getUserDetails(): any {
    let user: any = window.localStorage.getItem('_u');
    let userObj = JSON.parse(user);
    return userObj;
  }

  public getCurrentUserId(): string {
    let user: any = window.localStorage.getItem('_u');
    let userObj = JSON.parse(user);
    let currentUserId = userObj?.accountId;
    return currentUserId;
  }

  public logout(): void {
    window.localStorage.clear();
    this.currentUser = null;
    this.isLoggedIn.next(false);
    this._route.navigate(['/auth']);
  }

}
