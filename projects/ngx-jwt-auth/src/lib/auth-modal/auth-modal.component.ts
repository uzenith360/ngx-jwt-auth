import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Validators, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../auth.service';
import { EnvironmentConfigService } from '../environment-config.service';
import { EnvironmentConfig } from '../environment-config.interface';
import { lastValueFrom } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { TitleCasePipe } from '@angular/common';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { sixDigitNumberValidator } from '../six-digit-number-validator';

@Component({
    selector: 'app-auth-modal',
    templateUrl: './auth-modal.component.html',
    styleUrls: ['./auth-modal.component.css'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatIconButton, MatSuffix, MatIcon, MatDialogActions, MatRipple, MatDialogClose, TitleCasePipe]
})
export class AuthModalComponent {
  public shouldUsePinLogin: boolean = !!this.config.tryPINLogin && this.jwtExists && (this.platform.ANDROID || this.platform.IOS);
  public loginForm = new UntypedFormBuilder().group({
    [this.config.authIdName]: ['', this.shouldUsePinLogin ? Validators.nullValidator : Validators.required],
    password: ['', this.shouldUsePinLogin ? Validators.nullValidator : Validators.required],
    pin: ['', this.shouldUsePinLogin ? [Validators.required, sixDigitNumberValidator()] : Validators.nullValidator],
  });
  public authIdName: string = this.config.authIdName;
  public isSubmitting = false;
  public submitMessage: string
    = this.shouldUsePinLogin
      ? 'Please input your 6 Digit PIN to log in to your account'
      : 'Please input your login details to log in to your account';
  public hide: boolean = true;

  constructor(
    @Optional() public dialogRef: MatDialogRef<AuthModalComponent>,
    @Inject(MAT_DIALOG_DATA) private jwtExists: boolean/*JWTAndUser*//*: DialogData*/,
    @Inject(EnvironmentConfigService) private config: EnvironmentConfig,
    private readonly authManagerService: AuthService,
    private readonly platform: Platform,
  ) { }

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const loginFormValue = this.loginForm.value;
    const { [this.authIdName]: authId, password, pin } = loginFormValue;

    this.isSubmitting = true;
    this.submitMessage = 'Submitting...';

    lastValueFrom(
      this.shouldUsePinLogin
        ? this.authManagerService.authWithPIN(pin)
        : this.authManagerService.auth(authId, password)
    ).then(res => {
      this.isSubmitting = false;
      this.submitMessage = res.message;

      this.dialogRef.close(res.jwt);
    }).catch((err: any) => {
      this.isSubmitting = false;

      this.submitMessage = err.message;
    });
  }

  get loginFormControls(): any {
    return this.loginForm.controls;
  }

}
