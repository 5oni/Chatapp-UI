import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  usersList: any;
  page: number

  constructor(private userDataService: UserService) { }

  ngOnInit(): void {
    this.getUserListing();
    this.page = 1
  }

  getUserListing() {
    this.userDataService.getUsersList().subscribe({
      next: (resp: any) => {
        console.log(resp.data);
        this.usersList = resp.data
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  pageChanged(e: any) {
    console.log(e)
    this.page = e

  }

}
