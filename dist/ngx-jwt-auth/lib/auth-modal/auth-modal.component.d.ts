import { OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import JWTAndUser from '../jwt-and-user.interface';
import * as i0 from "@angular/core";
export declare class AuthModalComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<AuthModalComponent>;
    data: JWTAndUser;
    private fb;
    private authManagerService;
    private subs;
    loginForm: import("@angular/forms").UntypedFormGroup;
    isSubmitting: boolean;
    submitMessage: string;
    constructor(dialogRef: MatDialogRef<AuthModalComponent>, data: JWTAndUser, fb: UntypedFormBuilder, authManagerService: AuthService);
    ngOnDestroy(): void;
    ngOnInit(): void;
    login(): void;
    get loginFormControls(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthModalComponent, [{ optional: true; }, null, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AuthModalComponent, "app-auth-modal", never, {}, {}, never, never, false, never>;
}
