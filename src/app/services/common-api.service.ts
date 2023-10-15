import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  public currentUser: any;
  public isUserLogin = false;
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    public _route: Router,
    private messageService: MessageService
  ) { }

  public showSuccess(message: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showInfo(message: any) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  showWarn(message: any) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
  }

  showError(message: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message || 'Something Went Wrong' });
  }

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

  public getFromLocalStorage(key: any): string {
    let value: any = window.localStorage.getItem(key);
    let valueObj = JSON.parse(value);
    return valueObj;
  }
  public setInLocalStorage(key: any, value: any): string {
    let res: any = window.localStorage.setItem(key, JSON.stringify(value));
    return res;
  }

  public logout(): void {
    window.localStorage.clear();
    this.currentUser = null;
    this.isLoggedIn.next(false);
    this._route.navigate(['/auth']);
  }

}
