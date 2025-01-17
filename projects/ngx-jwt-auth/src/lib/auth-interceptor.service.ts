import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthManagerService } from './auth-manager.service';
import { EnvironmentConfig } from './environment-config.interface';
import { EnvironmentConfigService } from './environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    @Inject(EnvironmentConfigService) private readonly config: EnvironmentConfig,
    private readonly authManagerService: AuthManagerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      // ['login', 'forgot-password', 'reset-password'].includes(req.url.substring(req.url.lastIndexOf('/') + 1))
      [
        this.config.loginUrl,
        this.config.pinLoginUrl,
        this.config.forgotPasswordUrl,
        this.config.resetPasswordUrl,
        ...(this.config.interceptorSkipUrls || [])
      ].includes(req.url)
      || req.headers.get("skip-interceptors")
    ) {
      const skipInterceptorReq = req.clone({ setHeaders: { 'skip-interceptors': '' } });

      return next.handle(skipInterceptorReq);
    }

    return from(this.authManagerService.getAuthorization())
      .pipe(
        switchMap((authToken) => {
          // do the changes here
          const authReq = req.clone({ setHeaders: { Authorization: authToken } });

          return next.handle(authReq);
        }),
        catchError((e) => {
          return throwError(e && e.status ? e : new HttpErrorResponse({ status: 401 }));
        })
      );
  }
}
