import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsersList() {
    return this.http.get('/user/v1/list');
  }

  getUserDetails(data: any) {
    return this.http.get('/user/v1/details', data);
  }

  checkEmailExists(data: any) {
    return this.http.get('/user/v1/email/exists', data);
  }

  checkUserNameExists(data: any) {
    return this.http.get('/user/v1/username/exists', data);
  }

  addNewUser(data: any) {
    return this.http.post('/user/v1/add', data);
  }
  updateUserDetails(data: any) {
    return this.http.post('/user/v1/edit', data);
  }



}
