import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { JwtInterface as JWT } from '@uzenith360/jwt-utils';
import { HttpHelpers } from './http-helpers';
import { EnvironmentConfig } from './environment-config.interface';
import HttpError from './http-error';
import { EnvironmentConfigService } from './environment-config.service';
import { JwtAuthService } from './jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(EnvironmentConfigService) private config: EnvironmentConfig,
    private jwtAuthService: JwtAuthService,
    private http: HttpClient,
  ) { }

  public authWithPIN(pin: string): Observable<{ message: string, jwt: JWT }> {
    const { access_token, old_access_token, token_type } = this.jwtAuthService.getJWT()!;

    return this.http.post(
      this.config.pinLoginUrl!,
      { pin },
      { headers: { Authorization: `${token_type} ${access_token || old_access_token}` } }
    ).pipe(
      HttpHelpers.retry(),
      catchError(
        (err, caught: Observable<{ jwt: JWT, message: string }>) => {
          switch (err.status) {
            case 422:
              return throwError(() => new HttpError(err?.body?.message, err.status));
            case 400:
            case 401:
              return throwError(() => new HttpError(err.error?.message ?? 'Login details are incorrect, use forgot password', err.status));
            case 500:
              return throwError(() => new HttpError(err.error?.message ?? 'Problem logging in, please try again', err.status));
            case 0:
            default:
              return throwError(() => new HttpError(err.error?.message ?? 'Problem logging in, please check network and try again', err.status));
          };
        },
      ),
      map(
        (data: { jwt: JWT, message: string }) => {
          return { message: data.message || 'Successfully logged in', jwt: data.jwt };
        },
      )
    );
  }

  public auth(authId: string, password: string): Observable<{ message: string, jwt: JWT }> {
    return this.http.post(this.config.loginUrl, { [this.config.authIdName]: authId, password })
      .pipe(
        HttpHelpers.retry(),
        catchError(
          (err, caught: Observable<{ jwt: JWT, message: string }>) => {
            switch (err.status) {
              case 422:
                return throwError(() => new HttpError(err?.body?.message, err.status));
              case 400:
              case 401:
                return throwError(() => new HttpError('Login details are incorrect, use forgot password', err.status));
              case 500:
                return throwError(() => new HttpError('Problem logging in, please try again', err.status));
              case 0:
              default:
                return throwError(() => new HttpError('Problem logging in, please check network and try again', err.status));
            };
          },
        ),
        map(
          (data: { jwt: JWT, message: string }) => {
            return { message: data.message || 'Successfully logged in', jwt: data.jwt };
          },
        )
      );
  }

  public logout(): Observable<any> {
    return this.http.delete(this.config.logoutUrl)
      .pipe(
        HttpHelpers.retry(),
        catchError(
          (err) => {
            switch (err.status) {
              case 401:
                return throwError(() => new HttpError('User wasn\'t authed', err.status));
              case 500:
                return throwError(() => new HttpError('Problem logging out, please try again', err.status));
              case 0:
              default:
                return throwError(() => new HttpError('Problem logging out, please check network and try again', err.status));
            }
          },
        ),
        map(
          () => {
            return { message: 'Successfully logged out' };
          },
        )
      );
  }

  public forgotPassword(authId: string): Observable<void> {
    return this.http.post(
      this.config.forgotPasswordUrl,
      { [this.config.authIdName]: authId },
    ).pipe(
      HttpHelpers.retry(),
      catchError(
        (err: HttpErrorResponse, caught: Observable<void>) => {
          switch (err.status) {
            case 500:
              return throwError(() => new HttpError('Problem sending otp, please try again', err.status));
            case 0:
            default:
              return throwError(
                () => new HttpError(
                  (err.error?.message?.join && err.error?.message?.join(', ')) ?? err.error?.message ?? err?.message ?? 'Problem sending otp, please check network and try again',
                  err.status,
                ),
              );
          };
        },
      ),
    );
  }

  public resetPassword(authId: string, password: string, code: string): Observable<void> {
    return this.http.put(
      this.config.resetPasswordUrl,
      {
        code,
        [this.config.authIdName]: authId,
        password,
      },
    ).pipe(
      HttpHelpers.retry(),
      catchError(
        (err: HttpErrorResponse, caught: Observable<void>) => {
          switch (err.status) {
            case 500:
              return throwError(() => new HttpError('Problem reseting, please try again', err.status));
            case 0:
            default:
              return throwError(
                () => new HttpError(
                  (err.error?.message?.join && err.error?.message?.join(', ')) ?? err.error?.message ?? err?.message ?? 'Problem reseting, please check network and try again',
                  err.status,
                ),
              );
          };
        },
      ),
    );
  }
}
