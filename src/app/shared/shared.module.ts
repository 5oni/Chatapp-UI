import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorComponent } from './show-error/show-error.component';
// import { JwtHelperServices } from '../services/jwt-helper.service';
import { CommonApiService } from '../services/common-api.service';
import { JWT_OPTIONS } from '@auth0/angular-jwt';


const SINGLETON_SERVICES: any = [
  // JwtHelperServices,
  CommonApiService,

];
@NgModule({
  declarations: [ShowErrorComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ShowErrorComponent
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      // imports: [],
      providers: [
        ...SINGLETON_SERVICES,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
      ],
    };
  }
}
