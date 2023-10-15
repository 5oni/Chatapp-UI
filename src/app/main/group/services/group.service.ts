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
  getGroupChatList(data: any) {
    return this.http.get('/groupChat/v1/list', data);
  }
  sendNewGroupChat(data: any) {
    return this.http.post('/groupChat/v1/add', data);
  }

  addNewGroup(data: any) {
    return this.http.post('/group/v1/add', data);
  }
  deleteGroup(data: any) {
    return this.http.post('/group/v1/delete', data);
  }
  addNewGroupMembers(data: any) {
    return this.http.post('/group/v1/add/members', data);
  }
  addChatReaction(data: any) {
    return this.http.post('/groupChat/v1/add/reaction', data);
  }
  removeChatReaction(data: any) {
    return this.http.post('/groupChat/v1/remove/reaction', data);
  }
}
