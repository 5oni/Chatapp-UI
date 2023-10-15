import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonApiService } from 'src/app/services/common-api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userForm: any;
  hidePassword = true
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private commonApiService: CommonApiService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.checkIfLoggedIn()
    // Initialize the form with FormBuilder
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  checkIfLoggedIn() {
    let jwtHelper = new JwtHelperService()
    console.log('this.jwtHelper.isTokenExpired', jwtHelper.isTokenExpired())

    if (this.commonApiService.isUserLoggedIn()) {
      this.router.navigate(['main']);
      return false
    }
    return true
  }


  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }

  onSubmit() {
    if (this.userForm.valid) {
      // Handle form submission here
      const userData = this.userForm.value;
      console.log('User Details:', userData);

      this.authService.loginUser(userData).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.userForm.reset()
          this.setRedirection(resp);
          this.commonApiService.showSuccess('Logged In')
        },
        error: (e) => {
          console.error(e);
          this.commonApiService.showError(e.error?.message || e.message)
        }
      })
    }
  }

  setRedirection(value: any) {
    this.commonApiService.setUserLoggedIn(value?.data);

    this.router.navigate(['main']);
  }
}
