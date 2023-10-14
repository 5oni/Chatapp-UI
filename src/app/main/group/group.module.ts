import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupListingComponent } from './group-listing/group-listing.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';

import { DialogModule } from 'primeng/dialog';
import { PickerModule } from "@ctrl/ngx-emoji-mart";

@NgModule({
  declarations: [
    GroupListingComponent,
    AddGroupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    MultiSelectModule,
    SharedModule,
    ReactiveFormsModule,
    PickerModule,
    GroupRoutingModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class GroupModule { }
