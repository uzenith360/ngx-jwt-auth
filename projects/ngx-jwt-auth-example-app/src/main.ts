import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { JwtAuthModule, EnvironmentConfig } from 'ngx-jwt-auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

const config: EnvironmentConfig
  = {
  forgotPasswordUrl: '',
  getLoggedinUserProfileUrl: '',
  loginUrl: '',
  logoutUrl: '',
  pinLoginUrl: '',
  tryPINLogin: true,
  resetPasswordUrl: '',
  superAdminPages: [''],
  tokenStoreId: '',
  authIdName: 'Phone',
};




bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, JwtAuthModule.forRoot(config)),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
