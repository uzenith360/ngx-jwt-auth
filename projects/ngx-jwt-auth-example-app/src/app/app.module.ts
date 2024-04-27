import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentConfig } from 'ngx-jwt-auth';
import { JwtAuthModule } from 'ngx-jwt-auth';

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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtAuthModule.forRoot(config),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
