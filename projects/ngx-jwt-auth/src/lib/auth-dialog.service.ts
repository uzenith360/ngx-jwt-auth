import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtInterface } from '@uzenith360/jwt-utils';
import { Subject, lastValueFrom } from 'rxjs';

import { AuthModalComponent } from './auth-modal/auth-modal.component';
// import {JWTAndUser} from './jwt-and-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  private static isInstanceOpen: boolean = false;
  private static LoginSuccessSubject = new Subject</*JWTAndUser*/JwtInterface | undefined>();

  private static loginSuccessSubject$ = AuthDialogService.LoginSuccessSubject.asObservable();

  constructor(private dialog: MatDialog) { }

  open(): Promise</*JWTAndUser*/JwtInterface> {
    if (AuthDialogService.isInstanceOpen === true) {
      return new Promise((resolve, reject) => {
        lastValueFrom(AuthDialogService.loginSuccessSubject$)
          .then(
            (jwt?: JwtInterface/*JWTAndUser*/) => {
              !!jwt ? resolve(jwt) : reject(null);
            },
          );
      });
    }

    AuthDialogService.isInstanceOpen = true;

    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(AuthModalComponent, {
        restoreFocus: true,
        disableClose: true,
        data: {}
      });

      lastValueFrom(dialogRef.afterClosed())
        .then((jwt?: /*JWTAndUser*/JwtInterface) => {
          jwt ? resolve(jwt) : reject(null);

          AuthDialogService.LoginSuccessSubject.next(jwt);

          AuthDialogService.isInstanceOpen = false;
        });

    });
  }
}
