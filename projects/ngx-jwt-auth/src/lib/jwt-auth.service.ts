import { Inject, Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import {JwtInterface as JWT} from '@uzenith360/jwt-utils';
import {User} from './user.interface';
import { EnvironmentConfig } from './environment-config.interface';
import EnvironmentConfigService from './environment-config.service';
import {JWTAndUser} from './jwt-and-user.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  private readonly storeId: string;
  private static helper: JwtHelperService = new JwtHelperService();

  constructor(@Inject(EnvironmentConfigService) private config: EnvironmentConfig,) {
    this.storeId = config.tokenStoreId;
  }

  public getJWTAndUser(): JWTAndUser | null {
    const jwt: JWT | null = this.get();

    return !!jwt
      ? {
        jwt,
        user: this.decode(jwt) as User,
      } : null;
  }

  public getJWT(): JWT | null {
    return this.get();
    // const jwt: JWT | null = this.get();

    // return !!jwt
    //   ? {
    //     access_token: jwt.access_token,
    //     // expires_in: jwt.expires_in,
    //     token_type: jwt.token_type,
    //   } : null;
  }

  public getUser(): User | null {
    const jwt: JWT | null = this.get();

    return !!jwt ? this.decode(jwt) as User : null;
  }

  // public setUser(user: User): void {
  //   const jwt = this.getJWTAndUser();

  //   if (jwt) {
  //     jwt.user = user;

  //     this.set(jwt);
  //   }
  // }

  public set(jwt: JWT): void {
    localStorage.setItem(this.storeId, JSON.stringify(jwt));
  }

  private get(): JWT | null {
    try {
      const sessionItem: string | null = localStorage.getItem(this.storeId);

      if (!!sessionItem) {
        return JSON.parse(sessionItem) as JWT;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  public check(): boolean {
    const jwt = this.getJWT();

    if (!!jwt) {
      return JwtAuthService.helper.isTokenExpired(jwt.access_token);
    } else {
      return true;
    }
  }

  public decode<T>(jwt: JWT): T | null {
    try {
      const accessToken: string | undefined
        = jwt?.access_token;

      return !!accessToken
        ? JwtAuthService.helper.decodeToken(
          accessToken,
        )
        : null;
    } catch (e) {
      return null;
    }
  }

  public clear(): void {
    localStorage.removeItem(this.storeId);
  }

}
