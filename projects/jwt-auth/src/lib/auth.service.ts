import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import JWTAndUser from './jwt-and-user.interface';
import { HttpHelpers } from './http-helpers';
import { EnvironmentConfig } from './environment-config.interface';
import HttpError from './http-error';
import EnvironmentConfigService from './environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(EnvironmentConfigService) private config: EnvironmentConfig,
    private http: HttpClient,
  ) { }

  public auth(email: string, password: string): Observable<{ message: string, jwtAndUser: JWTAndUser }> {
    return this.http.post(this.config.loginUrl, { email, password })
      .pipe(
        HttpHelpers.retry(),
        catchError(
          (err, caught: Observable<JWTAndUser>) => {
            switch (err.status) {
              case 401:
                return throwError(() => new HttpError('Email/Password combination is incorrect', err.status));
              case 500:
                return throwError(() => new HttpError('Problem logging in, please try again', err.status));
              case 0:
              default:
                return throwError(() => new HttpError('Problem logging in, please check network and try again', err.status));
            };
          },
        ),
        map(
          (jwtAndUser: JWTAndUser) => {
            return { message: 'Successfully logged in', jwtAndUser };
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

  public forgotPassword(email: string): Observable<void> {
    return this.http.post(
      this.config.forgotPasswordUrl,
      { email },
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

  public resetPassword(email: string, password: string, code: string): Observable<void> {
    return this.http.put(
      this.config.resetPasswordUrl,
      {
        code,
        email,
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
