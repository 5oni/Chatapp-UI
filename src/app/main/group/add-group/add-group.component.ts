import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user/services/user.service';
import { GroupService } from '../services/group.service';
import { CommonApiService } from 'src/app/services/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

  groupForm: any
  usersList: any
  selectedMembers = []

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private userDataService: UserService,
    private groupService: GroupService,
    private commonApiService: CommonApiService,
    private router: Router

  ) { }

  ngOnInit() {

    this.createAddGroupForm()
    this.getUserList()
  }
  createAddGroupForm() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
    });
  }

  get name() { return this.groupForm.get('name') }


  onSubmit() {
    if (this.groupForm.valid) {
      // Handle form submission here
      const groupData = this.groupForm.value;
      console.log('Group Details:', groupData);
      groupData.members = this.selectedMembers?.map((el: any) => el._id)
      this.groupService.addNewGroup(groupData).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.groupForm.reset()
          this.selectedMembers = []
          this.commonApiService.showSuccess('Group Created')
          this.router.navigate(['/main/group'])
        },
        error: (e) => {
          console.error(e);
          this.commonApiService.showError(e.error?.message || e.message)
        }
      })

    }

  }

  getUserList() {
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


  goBack(): void {
    this.location.back();
  }
}
