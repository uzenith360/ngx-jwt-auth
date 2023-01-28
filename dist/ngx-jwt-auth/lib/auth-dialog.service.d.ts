import { MatDialog } from '@angular/material/dialog';
import JWTAndUser from './jwt-and-user.interface';
import * as i0 from "@angular/core";
export declare class AuthDialogService {
    private dialog;
    private static isInstanceOpen;
    private static LoginSuccessSubject;
    private static loginSuccessSubject$;
    constructor(dialog: MatDialog);
    open(): Promise<JWTAndUser>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthDialogService>;
}
