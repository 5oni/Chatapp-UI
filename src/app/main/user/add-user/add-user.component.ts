import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Initialize the form with FormBuilder
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Handle form submission here
      const userData = this.userForm.value;
      console.log('User Details:', userData);

      // You can send the user data to your backend API for registration here
      // Example: Call a registration service
      // this.userService.registerUser(userData).subscribe(response => {
      //   // Handle the API response here
      // });
    }
  }

}
