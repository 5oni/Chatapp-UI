import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonApiService } from 'src/app/services/common-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {


  userEditForm: FormGroup;
  userDetails: any

  constructor(private fb: FormBuilder, private userDataService: UserService,
    private commonApiService: CommonApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute


  ) { }

  ngOnInit() {
    if (this.commonApiService.getUserDetails()?.role != 'ADMIN') {
      this.router.navigate(['main/user'])
      return
    }
    this.readParams()
  }
  readParams() {
    this.initializeForm()
    this.activatedRoute.params.subscribe(params => {
      console.log(params)
      if (!params["userId"]) {
        this.router.navigate(['main/user'])
      }
      this.getUserDetails(params["userId"])

    });
  }


  initializeForm() {
    // Initialize the form with FormBuilder
    this.userEditForm = this.fb.group({
      name: [this.userDetails?.name, Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  checkUsernameAvailability() {
    let userName = this.userEditForm?.value?.userName
    if (!userName || !this.userEditForm.controls['userName']?.valid) {
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
        this.userEditForm.controls['userName'].setErrors({ 'available': { value: e?.error?.data, field: 'Username' } });
        console.error(e);
      }
    }
    )
  }

  checkEmailAvailability() {
    let email = this.userEditForm?.value?.email
    if (!email || !this.userEditForm.controls['email'].valid) {
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
        this.userEditForm.controls['email'].setErrors({ 'available': { value: e?.error?.data, field: 'email' } });
        console.error(e);
      }
    }
    )
  }

  get userName() { return this.userEditForm.get('userName') }
  get email() { return this.userEditForm.get('email') }
  get password() { return this.userEditForm.get('password') }
  get name() { return this.userEditForm.get('name') }


  getUserDetails(userId: any) {
    let payload = {
      userId
    }
    this.userDataService.getUserDetails({ params: payload }).subscribe({
      next: (resp: any) => {
        this.userDetails = resp.data
        this.userEditForm.patchValue({ ...resp.data })
      },
      error: (e) => {
        console.error(e);
      }

    })
  }

  onSubmit() {
    if (this.userEditForm.valid) {
      // Handle form submission here
      const userData = this.userEditForm.value;
      console.log('User Details:', userData);
      userData.userId = this.userDetails?._id

      this.userDataService.updateUserDetails(userData).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.userEditForm.reset()
          this.router.navigate(['/main/user'])
        },
        error: (e) => {
          console.error(e);
        }
      }
      )
    }
  }

}
