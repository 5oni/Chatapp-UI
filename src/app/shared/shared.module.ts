import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorComponent } from './show-error/show-error.component';
// import { JwtHelperServices } from '../services/jwt-helper.service';
import { CommonApiService } from '../services/common-api.service';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { DateParserPipe } from './pipes/date-parser.pipe';
import { TimeParserPipe } from './pipes/time-parser.pipe';


const SINGLETON_SERVICES: any = [
  // JwtHelperServices,
  CommonApiService,

];
@NgModule({
  declarations: [ShowErrorComponent, DateParserPipe, TimeParserPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ShowErrorComponent,
    DateParserPipe,
    TimeParserPipe
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
