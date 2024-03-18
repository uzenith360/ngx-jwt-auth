import { Inject, Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtInterface as JWT } from '@uzenith360/jwt-utils';
import { User } from './user.interface';
import { EnvironmentConfig } from './environment-config.interface';
import { EnvironmentConfigService } from './environment-config.service';
import { JWTAndUser } from './jwt-and-user.interface';
import InMemoryCache from '@uzenith360/in-memory-cache';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  private readonly storeId: string;
  private static helper: JwtHelperService = new JwtHelperService();

  private readonly getItem: (key: string) => string | null;
  private readonly setItem: (key: string, value: string) => void;
  private readonly removeItem: (key: string) => void;

  constructor(@Inject(EnvironmentConfigService) private config: EnvironmentConfig) {
    this.storeId = config.tokenStoreId;

    // handle: Failed to read the 'localStorage' property from 'Window': Access is denied for this document
    if (this.isLocalStorageAvailable()) {
      // even if local storage is available, 
      // still use inMemory cache cos of the Photoshop CRACK that makes the isLocalStorageAvailable look successfull 
      // but nothing gets saved to browser storage and nothing can be returned
      const inMemory: InMemoryCache<string> = new InMemoryCache();

      this.getItem = (key: string) => localStorage.getItem(key) ?? inMemory.get(key) ?? null;

      this.setItem = (key: string, value: string) => {
        try {
          localStorage.setItem(key, value)
        } catch (e) {
          console.error(e);
        }

        inMemory.set(key, value);
      };

      this.removeItem = (key: string) => {
        localStorage.removeItem(key);

        inMemory.del(key);
      }
    } else {
      const inMemory: InMemoryCache<string> = new InMemoryCache();

      this.getItem = (key: string) => inMemory.get(key) ?? null;
      this.setItem = (key: string, value: string) => inMemory.set(key, value);
      this.removeItem = (key: string) => inMemory.del(key);
    }
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
    this.setItem(this.storeId, JSON.stringify(jwt));
  }

  private get(): JWT | null {
    try {
      const sessionItem: string | null = this.getItem(this.storeId);

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
    this.removeItem(this.storeId);
  }

  private isLocalStorageAvailable(): boolean {
    var test = 'test';

    try {
      localStorage.setItem(test, test);

      if (localStorage.getItem(test) !== test) {
        return false;
      }

      localStorage.removeItem(test);

      return true;
    } catch (e) {
      console.error(e);

      alert(`Your browser is set to block cookies and site data, consider changing this setting.`);

      return false;
    }
  }

}
