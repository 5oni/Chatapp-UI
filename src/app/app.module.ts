import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptorService } from './services/app-interceptor.service';
import { HeaderComponent } from './main/header/header.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    ToastModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MultiSelectModule
    // NgMultiSelectDropDownModule,

  ],
  exports: [
    // HeaderComponent
    // FooterComponent,
  ],
  providers: [
    httpInterceptorProvider,
    MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
