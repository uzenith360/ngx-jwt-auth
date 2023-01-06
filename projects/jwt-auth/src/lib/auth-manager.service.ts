import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtAuthService } from './jwt-auth.service';
import { AuthService } from './auth.service';

import { AuthDialogService } from './auth-dialog.service';
import User from './user.interface';
import JWTAndUser from './jwt-and-user.interface';
import AuthError from './auth-error';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {
  private redirectUrl?: string;

  constructor(
    private JwtAuthService: JwtAuthService,
    private authService: AuthService,
    private authDialogService: AuthDialogService
  ) {}

  /**
   * Just check if there's auth
   */
  private isAuth(): boolean {
    return !this.JwtAuthService.check();
  }

  public auth(email: string, password: string): Observable<{ message: string, jwtAndUser: JWTAndUser }> {
    return this.authService.auth(email, password)
      .pipe(
        map(({ message, jwtAndUser }) => {
          this.JwtAuthService.set(jwtAndUser);

          return { message, jwtAndUser };
        })
      );
  }

  /**
   *
   * @param force if user not logged in, force authentication by showing login popup dialog
   * @param dontCheckAuth If true, dont check if user is authed, just return last user auth data
   */
  public getAuthAndUser(force: boolean = true, dontCheckAuth: boolean = false): Promise<JWTAndUser> {
    if (dontCheckAuth || this.isAuth()) {
      const jwtAndUser: JWTAndUser | null = this.JwtAuthService.getJWTAndUser();

      if (!!jwtAndUser) {
        return Promise.resolve(jwtAndUser);
      } else {
        return Promise.reject(Error('No authed'));
      }
    } else if (force) {
      return new Promise((resolve, reject) => {
        this.authDialogService
          .open()
          .then((jwtAndUser) => {
            this.JwtAuthService.set(jwtAndUser);

            resolve(jwtAndUser);
          }).catch((err) => reject(new AuthError(err?.message)));
      });
    } else {
      return Promise.reject(new AuthError('User isnt authed'));
    }
  }

  public getLoggedInUser(forceAuth: boolean = true): Promise<User> {
    return new Promise((resolve, reject) => {
      this.getAuthAndUser(forceAuth)
        .then(({ user }) => resolve(user /* && jwtAndUser.user || this.JwtAuthService.getUser()*/))
        .catch((err) => reject(err));
    });
  }

  public getAuthorization(forceAuth: boolean = true): Promise<string> {
    return new Promise((resolve, reject) => {
      this.getAuthAndUser(forceAuth)
        .then(({ access_token, token_type }) => resolve(`${token_type} ${access_token}`))
        .catch((err) => reject(err));
    });
  }

  public updateUser(user: any): void {
    this.JwtAuthService.setUser(user);
  }

  // public logout(): void {
  //   return this.JwtAuthService.clear();
  // }

  public logout(): Observable<any> {
    return this.authService.logout()
      .pipe(
        map(({ message }) => {
          this.JwtAuthService.clear();

          return { message };
        })
      );
  }

  public setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  public getRedirectUrl(): string | undefined {
    return this.redirectUrl;
  }

  public resetRedirectUrl(): void {
    this.redirectUrl = undefined;
  }
}
