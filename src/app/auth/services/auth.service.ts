import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient

  ) { }

  loginUser(data: any) {
    return this.http.post('/auth/v1/login', data);
  }

}
