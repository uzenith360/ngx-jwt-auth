import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import EnvironmentConfig from 'dist/jwt-auth/lib/environment-config.interface';
import { JwtAuthModule } from 'jwt-auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config: EnvironmentConfig
  = {
    forgotPasswordUrl: '',
    getLoggedinUserProfileUrl: '',
    loginUrl: '',
    logoutUrl: '',
    resetPasswordUrl: '',
    superAdminPages: [''],
    tokenStoreId: ''
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
