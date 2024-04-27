import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, UntypedFormBuilder } from '@angular/forms';

import { AuthService } from '../auth.service';
import { EnvironmentConfigService } from '../environment-config.service';
import { EnvironmentConfig } from '../environment-config.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit {
  public isJWTExists: boolean= !!this.config.tryPINLogin && this.jwtExists;
  public loginForm = new UntypedFormBuilder().group({
    [this.config.authIdName]: ['', this.isJWTExists ? Validators.nullValidator : Validators.required],
    password: ['', this.isJWTExists ? Validators.nullValidator : Validators.required],
    pin: ['', this.isJWTExists ? Validators.required : Validators.nullValidator],
  });
  public authIdName: string = this.config.authIdName;
  public isSubmitting = false;
  public submitMessage!: string;

  constructor(
    @Optional() public dialogRef: MatDialogRef<AuthModalComponent>,
    @Inject(MAT_DIALOG_DATA) private jwtExists: boolean/*JWTAndUser*//*: DialogData*/,
    @Inject(EnvironmentConfigService) private config: EnvironmentConfig,
    private readonly authManagerService: AuthService,
  ) { }

  ngOnInit(): void { }

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const loginFormValue = this.loginForm.value;
    const { [this.authIdName]: authId, password, pin } = loginFormValue;

    this.isSubmitting = true;
    this.submitMessage = 'Submitting...';

    lastValueFrom(
      this.isJWTExists
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
