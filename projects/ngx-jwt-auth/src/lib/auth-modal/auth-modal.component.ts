import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, UntypedFormBuilder } from '@angular/forms';

import { AuthService } from '../auth.service';
import { JWTAndUser } from '../jwt-and-user.interface';
import { EnvironmentConfigService } from '../environment-config.service';
import { EnvironmentConfig } from '../environment-config.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  public loginForm = new UntypedFormBuilder().group({
    [this.config.authIdName]: ['', Validators.required],
    password: ['', Validators.required],
  });
  public authIdName: string;
  public isSubmitting = false;
  public submitMessage!: string;

  constructor(
    @Optional() public dialogRef: MatDialogRef<AuthModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JWTAndUser/*: DialogData*/,
    @Inject(EnvironmentConfigService) private config: EnvironmentConfig,
    private readonly authManagerService: AuthService,
  ) {
    this.authIdName = this.config.authIdName;
  }

  ngOnInit(): void { }

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const loginFormValue = this.loginForm.value;
    const { [this.authIdName]: authId, password } = loginFormValue;

    this.isSubmitting = true;
    this.submitMessage = 'Submitting...';

    lastValueFrom(this.authManagerService.auth(authId, password))
      .then(res => {
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
