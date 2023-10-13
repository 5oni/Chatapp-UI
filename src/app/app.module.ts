import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptorService } from './services/app-interceptor.service';
import { HeaderComponent } from './main/header/header.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

export const httpInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptorService,
    multi: true
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    // NgMultiSelectDropDownModule,

  ],
  exports: [
    // HeaderComponent
    // FooterComponent,
  ],
  providers: [
    httpInterceptorProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
