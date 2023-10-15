import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonApiService } from 'src/app/services/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm: FormGroup;
  hidePassword = true
  @Output()
  updateUsers: EventEmitter<any> = new EventEmitter();


  constructor(private fb: FormBuilder, private userDataService: UserService,
    private commonApiService: CommonApiService,
    private router: Router,


  ) { }

  ngOnInit() {
    if (this.commonApiService.getUserDetails()?.role != 'ADMIN') {
      this.router.navigate(['main/user'])
      return
    }
    // Initialize the form with FormBuilder
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  checkUsernameAvailability() {
    let userName = this.userForm?.value?.userName
    if (!userName || !this.userForm.controls['userName']?.valid) {
      return
    }
    let payload = {
      userName
    }
    this.userDataService.checkUserNameExists({ params: payload }).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (e) => {
        this.userForm.controls['userName'].setErrors({ 'available': { value: e?.error?.data, field: 'Username' } });
        console.error(e);
      }
    }
    )
  }

  checkEmailAvailability() {
    let email = this.userForm?.value?.email
    if (!email || !this.userForm.controls['email'].valid) {
      return
    }
    let payload = {
      email
    }
    this.userDataService.checkEmailExists({ params: payload }).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (e) => {
        this.userForm.controls['email'].setErrors({ 'available': { value: e?.error?.data, field: 'email' } });
        console.error(e);
      }
    }
    )
  }

  get userName() { return this.userForm.get('userName') }
  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }
  get name() { return this.userForm.get('name') }

  onSubmit() {
    if (this.userForm.valid) {
      // Handle form submission here
      const userData = this.userForm.value;
      console.log('User Details:', userData);

      this.userDataService.addNewUser(userData).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.updateUsers.emit()
          this.userForm.reset()
          this.commonApiService.showSuccess('User Added')
        },
        error: (e) => {
          console.error(e);
          this.commonApiService.showError(e.error?.message || e.message)

        }
      }
      )
    }
  }

}
