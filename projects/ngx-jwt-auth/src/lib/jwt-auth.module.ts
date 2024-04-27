import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authHttpInterceptorProvider } from './auth-http-interceptor-provider';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthManagerService } from './auth-manager.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtAuthService } from './jwt-auth.service';
import { AuthDialogService } from './auth-dialog.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthManagerGuard } from './auth-manager.guard';
import { EnvironmentConfig } from './environment-config.interface';
import { EnvironmentConfigService } from './environment-config.service';

@NgModule({
  declarations: [
    AuthModalComponent,
  ],
  imports: [
    JwtModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  // providers: [],
  exports: [
    JwtModule,
  ],
})
export class JwtAuthModule {
  static forRoot(config: EnvironmentConfig): ModuleWithProviders<JwtAuthModule> {
    return {
      ngModule: JwtAuthModule,
      providers: [
        authHttpInterceptorProvider,
        AuthInterceptorService,
        AuthManagerService,
        JwtAuthService,
        AuthDialogService,
        // JwtHelperService,
        AuthManagerGuard,
        AuthService,
        UserService,
        {
          provide: EnvironmentConfigService,
          useValue: config,
        }
      ]
    }
  }
}
