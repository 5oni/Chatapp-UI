import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      // { path: '', component:, pathMatch: 'full' },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
