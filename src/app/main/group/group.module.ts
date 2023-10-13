import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupListingComponent } from './group-listing/group-listing.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GroupListingComponent,
    AddGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    GroupRoutingModule,
  ]
})
export class GroupModule { }
