import { Inject, Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import JWT from './jwt.interface';
import JWTAndUser from './jwt-and-user.interface';
import User from './user.interface';
import EnvironmentConfig from './environment-config.interface';
import EnvironmentConfigService from './environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class JwtManagerService {
  private readonly storeId: string;
  private static helper: JwtHelperService = new JwtHelperService();

  constructor(@Inject(EnvironmentConfigService) private config: EnvironmentConfig,) {
    this.storeId = config.tokenStoreId;
  }

  public getJWTAndUser(): JWTAndUser | null {
    try {
      const sessionItem: string | null = localStorage.getItem(this.storeId);

      if (sessionItem) {
        return JSON.parse(sessionItem) as JWTAndUser;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  public getJWT(): JWT | null {
    const jwtAndUser: JWTAndUser | null = this.getJWTAndUser();

    return jwtAndUser ? {
      access_token: jwtAndUser.access_token,
      // expires_in: jwtAndUser.expires_in,
      token_type: jwtAndUser.token_type
    } : null;
  }

  public getUser(): User | undefined {
    return this.getJWTAndUser()?.user;
  }

  public setUser(user: User): void {
    const jwt = this.getJWTAndUser();

    if (jwt) {
      jwt.user = user;

      this.set(jwt);
    }
  }

  public set(jwtAndUser: JWTAndUser): void {
    localStorage.setItem(this.storeId, JSON.stringify(jwtAndUser));
  }

  public check(): boolean {
    const jwt = this.getJWT();

    if (jwt) {
      return JwtManagerService.helper.isTokenExpired(jwt.access_token);
    } else {
      return true;
    }
  }

  public decode(): any {
    return JwtManagerService.helper.decodeToken(JSON.stringify(this.getJWT()));
  }

  public clear(): void {
    localStorage.removeItem(this.storeId);
  }

}
