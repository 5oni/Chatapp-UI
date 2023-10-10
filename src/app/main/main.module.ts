import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
// import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    // CreateUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MainRoutingModule
  ]
})
export class MainModule { }
