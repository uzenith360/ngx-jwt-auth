import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtAuthService } from './jwt-auth.service';
import { AuthService } from './auth.service';

import { AuthDialogService } from './auth-dialog.service';
import { User } from './user.interface';
import { JwtInterface as JWT, JwtInterface } from '@uzenith360/jwt-utils';
import AuthError from './auth-error';
import { JWTAndUser } from './jwt-and-user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {
  public static jwtHelperService: JwtHelperService = new JwtHelperService();
  
  private redirectUrl?: string;

  constructor(
    private jwtAuthService: JwtAuthService,
    private authService: AuthService,
    private authDialogService: AuthDialogService
  ) { }

  /**
   * Just check if there's auth
   */
  public isAuth(): boolean {
    return !this.jwtAuthService.check();
  }

  public auth(authId: string, password: string): Observable<{ message: string, user: User }> {
    return this.authService.auth(authId, password)
      .pipe(
        map(({ jwt, message }) => {
          this.jwtAuthService.set(jwt);

          return { message, user: this.jwtAuthService.decode<User>(jwt)! }
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
      const jwtAndUser: JWTAndUser | null = this.jwtAuthService.getJWTAndUser();

      if (!!jwtAndUser) {
        return Promise.resolve(jwtAndUser);
      } else {
        return Promise.reject(Error('No authed'));
      }
    } else if (force) {
      return new Promise((resolve, reject) => {
        this.authDialogService
          .open(this.jwtAuthService.jwtExists)
          .then((/*jwtAndUser*/jwt) => {
            this.jwtAuthService.set(/*jwtAndUser.jwt*/jwt);

            resolve(/*jwtAndUser*/{ jwt, user: this.jwtAuthService.decode(jwt)! });
          }).catch((err) => reject(new AuthError(err?.message)));
      });
    } else {
      return Promise.reject(new AuthError('User isnt authed'));
    }
  }

  public setJWT(jwt: JwtInterface): void {
    return this.jwtAuthService.set(jwt);
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
        .then(({ jwt: { access_token, token_type } }) => resolve(`${token_type} ${access_token}`))
        .catch((err) => reject(err));
    });
  }

  // public updateUser(user: any): void {
  //   this.JwtAuthService.setUser(user);
  // }

  // public logout(): void {
  //   return this.JwtAuthService.clear();
  // }

  public logout(): Observable<any> {
    return this.authService.logout()
      .pipe(
        map(({ message }) => {
          this.jwtAuthService.clear();

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

  public getUserSync(): User | null {
    return this.jwtAuthService.getUser();
  }
}


/**
 * Do after popup login event handle to set the pin
 * add url endpoint for regenerate auth via pin
 * add option for login with pin instead of password
 */