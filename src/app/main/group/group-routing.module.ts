import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListingComponent } from './group-listing/group-listing.component';
import { AddGroupComponent } from './add-group/add-group.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: GroupListingComponent },
      { path: 'add', component: AddGroupComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
