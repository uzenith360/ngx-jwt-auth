import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Component, Optional, NgModule } from '@angular/core';
import { of, throwError, Subject, from } from 'rxjs';
import { retryWhen, delay, take, concatMap, catchError, map, switchMap } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { HttpErrorResponse, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as i1$1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i2 from '@angular/forms';
import { UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SubSink } from 'subsink';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import * as i6 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i7 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i2$1 from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class HttpHelpers {
    static retry() {
        return retryWhen(errors => errors.pipe(delay(700), take(HttpHelpers.retryCount), concatMap((e, r) => {
            if (HttpHelpers.retryableStatuses.indexOf(e.status) !== -1 && (r < HttpHelpers.retryCount - 1)) {
                return of(e);
            }
            return throwError(e);
        })));
    }
}
HttpHelpers.retryCount = 5;
HttpHelpers.retryableStatuses = [0, 500];

const EnvironmentConfigService = new InjectionToken('EnvironmentConfig');

class UserService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
    }
    getProfile() {
        return this.http.get(this.config.getLoggedinUserProfileUrl)
            .pipe(HttpHelpers.retry(), catchError((err, caught) => {
            switch (err.status) {
                case 500:
                    return throwError({ message: 'Problem getting profile, please try again', status: err.status });
                case 0:
                default:
                    return throwError({ message: 'Problem getting profile, please check network and try again', status: err.status });
            }
        }), map((profile) => {
            return { message: 'Successfully logged in', profile };
        }));
    }
}
UserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: UserService, deps: [{ token: EnvironmentConfigService }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
UserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: UserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: UserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }, { type: i1.HttpClient }]; } });

class HttpError extends Error {
    constructor(status, code) {
        super(status);
        this.code = code;
    }
}

class AuthService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
    }
    auth(email, password) {
        return this.http.post(this.config.loginUrl, { email, password })
            .pipe(HttpHelpers.retry(), catchError((err, caught) => {
            switch (err.status) {
                case 401:
                    return throwError(() => new HttpError('Email/Password combination is incorrect', err.status));
                case 500:
                    return throwError(() => new HttpError('Problem logging in, please try again', err.status));
                case 0:
                default:
                    return throwError(() => new HttpError('Problem logging in, please check network and try again', err.status));
            }
            ;
        }), map((jwt) => {
            return { message: 'Successfully logged in', jwt };
        }));
    }
    logout() {
        return this.http.delete(this.config.logoutUrl)
            .pipe(HttpHelpers.retry(), catchError((err) => {
            switch (err.status) {
                case 401:
                    return throwError(() => new HttpError('User wasn\'t authed', err.status));
                case 500:
                    return throwError(() => new HttpError('Problem logging out, please try again', err.status));
                case 0:
                default:
                    return throwError(() => new HttpError('Problem logging out, please check network and try again', err.status));
            }
        }), map(() => {
            return { message: 'Successfully logged out' };
        }));
    }
    forgotPassword(email) {
        return this.http.post(this.config.forgotPasswordUrl, { email }).pipe(HttpHelpers.retry(), catchError((err, caught) => {
            switch (err.status) {
                case 500:
                    return throwError(() => new HttpError('Problem sending otp, please try again', err.status));
                case 0:
                default:
                    return throwError(() => new HttpError((err.error?.message?.join && err.error?.message?.join(', ')) ?? err.error?.message ?? err?.message ?? 'Problem sending otp, please check network and try again', err.status));
            }
            ;
        }));
    }
    resetPassword(email, password, code) {
        return this.http.put(this.config.resetPasswordUrl, {
            code,
            email,
            password,
        }).pipe(HttpHelpers.retry(), catchError((err, caught) => {
            switch (err.status) {
                case 500:
                    return throwError(() => new HttpError('Problem reseting, please try again', err.status));
                case 0:
                default:
                    return throwError(() => new HttpError((err.error?.message?.join && err.error?.message?.join(', ')) ?? err.error?.message ?? err?.message ?? 'Problem reseting, please check network and try again', err.status));
            }
            ;
        }));
    }
}
AuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthService, deps: [{ token: EnvironmentConfigService }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
AuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }, { type: i1.HttpClient }]; } });

class AuthError extends Error {
}

class JwtAuthService {
    constructor(config) {
        this.config = config;
        this.storeId = config.tokenStoreId;
    }
    getJWTAndUser() {
        const jwt = this.get();
        return !!jwt
            ? {
                jwt,
                user: this.decode(jwt),
            } : null;
    }
    getJWT() {
        return this.get();
        // const jwt: JWT | null = this.get();
        // return !!jwt
        //   ? {
        //     access_token: jwt.access_token,
        //     // expires_in: jwt.expires_in,
        //     token_type: jwt.token_type,
        //   } : null;
    }
    getUser() {
        const jwt = this.get();
        return !!jwt ? this.decode(jwt) : null;
    }
    // public setUser(user: User): void {
    //   const jwt = this.getJWTAndUser();
    //   if (jwt) {
    //     jwt.user = user;
    //     this.set(jwt);
    //   }
    // }
    set(jwt) {
        localStorage.setItem(this.storeId, JSON.stringify(jwt));
    }
    get() {
        try {
            const sessionItem = localStorage.getItem(this.storeId);
            if (!!sessionItem) {
                return JSON.parse(sessionItem);
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }
    check() {
        const jwt = this.getJWT();
        if (!!jwt) {
            return JwtAuthService.helper.isTokenExpired(jwt.access_token);
        }
        else {
            return true;
        }
    }
    decode(jwt) {
        try {
            const accessToken = jwt?.access_token;
            return !!accessToken
                ? JwtAuthService.helper.decodeToken(accessToken)
                : null;
        }
        catch (e) {
            return null;
        }
    }
    clear() {
        localStorage.removeItem(this.storeId);
    }
}
JwtAuthService.helper = new JwtHelperService();
JwtAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthService, deps: [{ token: EnvironmentConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
JwtAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }]; } });

class AuthModalComponent {
    constructor(dialogRef, data /*: DialogData*/, fb, authManagerService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.authManagerService = authManagerService;
        this.subs = new SubSink();
        this.loginForm = new UntypedFormBuilder().group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
        this.isSubmitting = false;
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    ngOnInit() { }
    login() {
        if (!this.loginForm.valid) {
            return;
        }
        const loginFormValue = this.loginForm.value;
        const { email, password } = loginFormValue;
        this.isSubmitting = true;
        this.submitMessage = 'Submitting...';
        this.subs.sink = this.authManagerService.auth(email, password)
            .subscribe(res => {
            this.isSubmitting = false;
            this.submitMessage = res.message;
            this.dialogRef.close(res.jwt);
        }, (err) => {
            this.isSubmitting = false;
            this.submitMessage = err.message;
        });
    }
    get loginFormControls() {
        return this.loginForm.controls;
    }
}
AuthModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthModalComponent, deps: [{ token: i1$1.MatDialogRef, optional: true }, { token: MAT_DIALOG_DATA }, { token: i2.UntypedFormBuilder }, { token: AuthService }], target: i0.ɵɵFactoryTarget.Component });
AuthModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AuthModalComponent, selector: "app-auth-modal", ngImport: i0, template: "<h1 mat-dialog-title class=\"text-center font-semibold text-md !mb-4\">Login</h1>\n<div class=\"!pb-0\" mat-dialog-content>\n  <small *ngIf=\"submitMessage\">{{submitMessage}}</small>\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\n    <mat-form-field class=\"w-full\" appearance=\"fill\">\n      <mat-label>Email</mat-label>\n      <input autocomplete=\"email\" type=\"email\" formControlName=\"email\" [readonly]=\"isSubmitting\" matInput required />\n      <mat-error *ngIf=\"loginFormControls.email?.errors?.required\">Email is required.\n      </mat-error>\n      <mat-error *ngIf=\"loginFormControls.email?.errors?.email\">Email is invalid.\n      </mat-error>\n    </mat-form-field>\n    <mat-form-field class=\"w-full\" appearance=\"fill\">\n      <mat-label>Password</mat-label>\n      <input autocomplete=\"current-password\" type=\"password\" formControlName=\"password\" [readonly]=\"isSubmitting\"\n        matInput required />\n      <mat-error *ngIf=\"loginFormControls.password?.errors?.required\">Password is required.\n      </mat-error>\n    </mat-form-field>\n    <button hidden type=\"submit\">Submit</button>\n  </form>\n</div>\n<div mat-dialog-actions>\n  <div class=\"justify-between flex w-full p-4 pt-0\">\n    <button class=\"px-4 py-2\" mat-button matRipple [mat-dialog-close]=\"null\" aria-label=\"Cancel Button\">Cancel</button>\n    <button class=\"px-4 py-2 shadow-sm rounded-sm bg-blue-900 text-white hover:text-blue-900 hover:bg-white\" mat-button\n      matRipple [disabled]=\"!loginForm.valid || isSubmitting\" aria-label=\"Login Button\" (click)=\"login()\">Login</button>\n  </div>\n</div>", styles: ["*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: \"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\";font-feature-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::-webkit-backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.static{position:static}.\\!mb-4{margin-bottom:1rem!important}.flex{display:flex}.hidden{display:none}.w-full{width:100%}.justify-between{justify-content:space-between}.rounded-sm{border-radius:.125rem}.bg-blue-900{--tw-bg-opacity: 1;background-color:rgb(30 58 138 / var(--tw-bg-opacity))}.p-4{padding:1rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.\\!pb-0{padding-bottom:0!important}.pt-0{padding-top:0}.text-center{text-align:center}.font-semibold{font-weight:600}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:bg-white:hover{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.hover\\:text-blue-900:hover{--tw-text-opacity: 1;color:rgb(30 58 138 / var(--tw-text-opacity))}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i5.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-auth-modal', template: "<h1 mat-dialog-title class=\"text-center font-semibold text-md !mb-4\">Login</h1>\n<div class=\"!pb-0\" mat-dialog-content>\n  <small *ngIf=\"submitMessage\">{{submitMessage}}</small>\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\n    <mat-form-field class=\"w-full\" appearance=\"fill\">\n      <mat-label>Email</mat-label>\n      <input autocomplete=\"email\" type=\"email\" formControlName=\"email\" [readonly]=\"isSubmitting\" matInput required />\n      <mat-error *ngIf=\"loginFormControls.email?.errors?.required\">Email is required.\n      </mat-error>\n      <mat-error *ngIf=\"loginFormControls.email?.errors?.email\">Email is invalid.\n      </mat-error>\n    </mat-form-field>\n    <mat-form-field class=\"w-full\" appearance=\"fill\">\n      <mat-label>Password</mat-label>\n      <input autocomplete=\"current-password\" type=\"password\" formControlName=\"password\" [readonly]=\"isSubmitting\"\n        matInput required />\n      <mat-error *ngIf=\"loginFormControls.password?.errors?.required\">Password is required.\n      </mat-error>\n    </mat-form-field>\n    <button hidden type=\"submit\">Submit</button>\n  </form>\n</div>\n<div mat-dialog-actions>\n  <div class=\"justify-between flex w-full p-4 pt-0\">\n    <button class=\"px-4 py-2\" mat-button matRipple [mat-dialog-close]=\"null\" aria-label=\"Cancel Button\">Cancel</button>\n    <button class=\"px-4 py-2 shadow-sm rounded-sm bg-blue-900 text-white hover:text-blue-900 hover:bg-white\" mat-button\n      matRipple [disabled]=\"!loginForm.valid || isSubmitting\" aria-label=\"Login Button\" (click)=\"login()\">Login</button>\n  </div>\n</div>", styles: ["*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: \"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",Segoe UI Symbol,\"Noto Color Emoji\";font-feature-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::-webkit-backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.static{position:static}.\\!mb-4{margin-bottom:1rem!important}.flex{display:flex}.hidden{display:none}.w-full{width:100%}.justify-between{justify-content:space-between}.rounded-sm{border-radius:.125rem}.bg-blue-900{--tw-bg-opacity: 1;background-color:rgb(30 58 138 / var(--tw-bg-opacity))}.p-4{padding:1rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.\\!pb-0{padding-bottom:0!important}.pt-0{padding-top:0}.text-center{text-align:center}.font-semibold{font-weight:600}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.hover\\:bg-white:hover{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.hover\\:text-blue-900:hover{--tw-text-opacity: 1;color:rgb(30 58 138 / var(--tw-text-opacity))}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i2.UntypedFormBuilder }, { type: AuthService }]; } });

class AuthDialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    open() {
        if (AuthDialogService.isInstanceOpen === true) {
            return new Promise((resolve, reject) => {
                AuthDialogService.loginSuccessSubject$.subscribe((jwt) => {
                    !!jwt ? resolve(jwt) : reject(null);
                });
            });
        }
        AuthDialogService.isInstanceOpen = true;
        return new Promise((resolve, reject) => {
            const dialogRef = this.dialog.open(AuthModalComponent, {
                restoreFocus: true,
                disableClose: true,
                data: {}
            });
            dialogRef.afterClosed().subscribe((jwt) => {
                jwt ? resolve(jwt) : reject(null);
                AuthDialogService.LoginSuccessSubject.next(jwt);
                AuthDialogService.isInstanceOpen = false;
            });
        });
    }
}
AuthDialogService.isInstanceOpen = false;
AuthDialogService.LoginSuccessSubject = new Subject();
AuthDialogService.loginSuccessSubject$ = AuthDialogService.LoginSuccessSubject.asObservable();
AuthDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthDialogService, deps: [{ token: i1$1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable });
AuthDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthDialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthDialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialog }]; } });

class AuthManagerService {
    constructor(jwtAuthService, authService, authDialogService) {
        this.jwtAuthService = jwtAuthService;
        this.authService = authService;
        this.authDialogService = authDialogService;
    }
    /**
     * Just check if there's auth
     */
    isAuth() {
        return !this.jwtAuthService.check();
    }
    auth(email, password) {
        return this.authService.auth(email, password)
            .pipe(map(({ message, jwt }) => {
            this.jwtAuthService.set(jwt);
            return { message, jwt };
        }));
    }
    /**
     *
     * @param force if user not logged in, force authentication by showing login popup dialog
     * @param dontCheckAuth If true, dont check if user is authed, just return last user auth data
     */
    getAuthAndUser(force = true, dontCheckAuth = false) {
        if (dontCheckAuth || this.isAuth()) {
            const jwtAndUser = this.jwtAuthService.getJWTAndUser();
            if (!!jwtAndUser) {
                return Promise.resolve(jwtAndUser);
            }
            else {
                return Promise.reject(Error('No authed'));
            }
        }
        else if (force) {
            return new Promise((resolve, reject) => {
                this.authDialogService
                    .open()
                    .then((jwtAndUser) => {
                    this.jwtAuthService.set(jwtAndUser.jwt);
                    resolve(jwtAndUser);
                }).catch((err) => reject(new AuthError(err?.message)));
            });
        }
        else {
            return Promise.reject(new AuthError('User isnt authed'));
        }
    }
    getLoggedInUser(forceAuth = true) {
        return new Promise((resolve, reject) => {
            this.getAuthAndUser(forceAuth)
                .then(({ user }) => resolve(user /* && jwtAndUser.user || this.JwtAuthService.getUser()*/))
                .catch((err) => reject(err));
        });
    }
    getAuthorization(forceAuth = true) {
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
    logout() {
        return this.authService.logout()
            .pipe(map(({ message }) => {
            this.jwtAuthService.clear();
            return { message };
        }));
    }
    setRedirectUrl(url) {
        this.redirectUrl = url;
    }
    getRedirectUrl() {
        return this.redirectUrl;
    }
    resetRedirectUrl() {
        this.redirectUrl = undefined;
    }
}
AuthManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerService, deps: [{ token: JwtAuthService }, { token: AuthService }, { token: AuthDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: JwtAuthService }, { type: AuthService }, { type: AuthDialogService }]; } });

class AuthInterceptorService {
    constructor(config, authManagerService) {
        this.config = config;
        this.authManagerService = authManagerService;
    }
    intercept(req, next) {
        if (
        // ['login', 'forgot-password', 'reset-password'].includes(req.url.substring(req.url.lastIndexOf('/') + 1))
        [this.config.loginUrl, this.config.forgotPasswordUrl, this.config.resetPasswordUrl].includes(req.url)
            || req.headers.get("skip-interceptors")) {
            return next.handle(req);
        }
        return from(this.authManagerService.getAuthorization())
            .pipe(switchMap((authToken) => {
            // do the changes here
            const authReq = req.clone({ setHeaders: { Authorization: authToken } });
            return next.handle(authReq);
        }), catchError((e) => {
            return throwError(e && e.status ? e : new HttpErrorResponse({ status: 401 }));
        }));
    }
}
AuthInterceptorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthInterceptorService, deps: [{ token: EnvironmentConfigService }, { token: AuthManagerService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthInterceptorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthInterceptorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthInterceptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }, { type: AuthManagerService }]; } });

/* "Barrel" of Http Interceptors */
/** Http interceptor providers in outside-in order */
const authHttpInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];

class AuthManagerGuard {
    constructor(config, authManagerService, router) {
        this.config = config;
        this.authManagerService = authManagerService;
        this.router = router;
    }
    canActivate(next, state) {
        const url = state.url;
        return this.checkLogin(url);
    }
    canActivateChild(next, state) {
        const url = state.url;
        return this.checkLogin(url);
    }
    checkLogin(url) {
        return new Promise((resolve, reject) => {
            this.authManagerService.getLoggedInUser().then((user) => {
                // Pages that only super admin can access
                const superAdminRoutes = this.config.superAdminPages || [];
                if (superAdminRoutes.some((route) => url.startsWith(`/${route}`)) && !user.isSuperAdmin) {
                    reject(false);
                    throw Error('Only super admins have access to this page!');
                }
                else {
                    resolve(true);
                }
            }).catch(() => {
                // redirect to me
                this.router.navigate(['auth']);
                reject(false);
            });
        });
    }
}
AuthManagerGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerGuard, deps: [{ token: EnvironmentConfigService }, { token: AuthManagerService }, { token: i2$1.Router }], target: i0.ɵɵFactoryTarget.Injectable });
AuthManagerGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }, { type: AuthManagerService }, { type: i2$1.Router }]; } });

class JwtAuthModule {
    static forRoot(config) {
        return {
            ngModule: JwtAuthModule,
            providers: [
                authHttpInterceptorProvider,
                AuthInterceptorService,
                AuthManagerService,
                JwtAuthService,
                AuthDialogService,
                JwtHelperService,
                AuthManagerGuard,
                AuthService,
                UserService,
                {
                    provide: EnvironmentConfigService,
                    useValue: config,
                }
            ],
        };
    }
}
JwtAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
JwtAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthModule, declarations: [AuthModalComponent], imports: [CommonModule,
        HttpClientModule,
        MatDialogModule,
        MatRippleModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule] });
JwtAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthModule, imports: [CommonModule,
        HttpClientModule,
        MatDialogModule,
        MatRippleModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AuthModalComponent,
                    ],
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        MatDialogModule,
                        MatRippleModule,
                        BrowserAnimationsModule,
                        ReactiveFormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                    ],
                    providers: [],
                    exports: [],
                }]
        }] });

/*
 * Public API Surface of ngx-jwt-auth
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthManagerGuard, AuthManagerService, AuthService, JwtAuthModule, UserService, authHttpInterceptorProvider };
//# sourceMappingURL=ngx-jwt-auth.mjs.map
