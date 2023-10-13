
import { Injectable } from '@angular/core';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { CommonApiService } from './common-api.service';
// import { CommonApiService } from './common-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private sharedService: CommonApiService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let finalUrl = environment.apiUrl + request.url;
    console.log(finalUrl)
    request = request.clone({
      url: finalUrl
    });

    const token: string = this.sharedService.getToken();
    const user = this.sharedService.getCurrentUserId();
    if (token) {

      request = request.clone({
        setHeaders: {
          'x-access-user': user + '',
          'x-access-token': token + '',
          'authorization': 'Bearer ' + token + ''
        },
      });
    }
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.statusText == "Unknown Error") {
              err.error.message = "Something Went Wrong";
            }
            // this.notifyService.showToast('Error', err.error.err, 'error');
            if (err.status === 401 || err.status === 403) {
              // this.sharedService.logout();
            }
          }
        }),
      );
  }
}
