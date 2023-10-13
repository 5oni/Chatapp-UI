import { Component } from '@angular/core';
import { GroupService } from '../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-listing',
  templateUrl: './group-listing.component.html',
  styleUrls: ['./group-listing.component.scss']
})
export class GroupListingComponent {

  groupList: any

  constructor(
    // private fb: FormBuilder,
    // private authService: AuthService,
    private groupService: GroupService,
    // private commonApiService: CommonApiService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.getUserGroups()
  }

  getUserGroups() {
    this.groupService.getGroupsList().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.groupList = resp.data
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  handleAddGroupButton() {
    this.router.navigate(['/add'])
  }
}
