import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './header/header.component';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MultiSelectModule,

    ReactiveFormsModule,
    NgxPaginationModule,
    MainRoutingModule
  ]
})
export class MainModule { }
