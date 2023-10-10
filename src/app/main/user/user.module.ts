import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddUserComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UserRoutingModule
  ]
})
export class UserModule { }
