import { Component } from '@angular/core';
import { CommonApiService } from 'src/app/services/common-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: any;
  constructor(
    private commonApiService: CommonApiService,
  ) { }

  ngOnInit() {
    this.setUserDetails()
  }
  setUserDetails() {
    let user = this.commonApiService.getUserDetails();
    this.userName = user.name
  }

  logout() {
    this.commonApiService.logout();
  }

}
