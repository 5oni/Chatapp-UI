import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  getGroupsList() {
    return this.http.get('/group/v1/list');
  }

  addNewGroup(data: any) {
    return this.http.post('/group/v1/add', data);
  }
}
