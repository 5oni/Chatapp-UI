import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { CommonApiService } from 'src/app/services/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  usersList: any;
  page: number;
  showAddUser = false

  constructor(private userDataService: UserService,
    private commonApiService: CommonApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.commonApiService.getUserDetails()?.role == 'ADMIN') {
      this.showAddUser = true
    }
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
        this.commonApiService.showError(e.error?.message || e.message)
      }
    })
  }

  pageChanged(e: any) {
    console.log(e)
    this.page = e

  }
  editNavigate(userId: any) {
    this.router.navigate(['/main/user/edit/', userId])
  }

}
