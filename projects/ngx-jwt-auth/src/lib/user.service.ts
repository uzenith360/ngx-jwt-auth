import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {User} from './user.interface';
import { HttpHelpers } from './http-helpers';
import { EnvironmentConfig } from './environment-config.interface';
import EnvironmentConfigService from './environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    @Inject(EnvironmentConfigService) private config: EnvironmentConfig,
    private http: HttpClient,
    ) { }

  public getProfile(): Observable<{profile: User, message: string}> {
    return this.http.get(this.config.getLoggedinUserProfileUrl)
      .pipe(
        HttpHelpers.retry(),
        catchError((err, caught: Observable<User>) => {
          switch (err.status) {
            case 500:
              return throwError({ message: 'Problem getting profile, please try again', status: err.status });
            case 0:
            default:
              return throwError({ message: 'Problem getting profile, please check network and try again', status: err.status });
          }
        }),
        map((profile: User) => {
          return { message: 'Successfully logged in', profile };
        })
      );
  }
}

