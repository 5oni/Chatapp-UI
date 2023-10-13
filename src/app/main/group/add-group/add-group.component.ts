import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

  groupForm: any
  usersList: any

  constructor(
    // private location: Location,
    private fb: FormBuilder,
    private userDataService: UserService
  ) { }

  ngOnInit() {

    this.createAddGroupForm()
    this.getUserList()
  }
  createAddGroupForm() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      members: [''],
      description: [''],
    });
  }

  get name() { return this.groupForm.get('name') }
  get members() { return this.groupForm.get('members') }


  onSubmit() {

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

  onChangeMembers(e: any) {
    console.log(e)
    // this.groupForm.value.members.push(e.target.value)

  }
  goBack(): void {
    // this.location.back();
  }
}
