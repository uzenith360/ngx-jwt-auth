import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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
    ) {console.log(req.url,'skip interceptor!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      // const skipInterceptorReq = req.clone();

      // const headersWithoutAuth = skipInterceptorReq.headers.delete('skip-interceptors');

      // return next.handle(skipInterceptorReq.clone({ headers: headersWithoutAuth }));

      // Create a new HttpHeaders object without the 'Authorization' header
    let newHeaders = new HttpHeaders();
    req.headers.keys().forEach(key => {
      if (key.toLowerCase() !== 'skip-interceptors') {
        newHeaders = newHeaders.set(key, req.headers.get(key) as string);
      }
    });

    // Clone the request with the new set of headers
    const clonedRequest = req.clone({ headers: newHeaders });

    return next.handle(clonedRequest);
    }

    return from(this.authManagerService.getAuthorization())
      .pipe(
        switchMap((authToken) => { console.log(req.url,'Add token!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
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
