import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
// import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    // CreateUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
