import { Component } from '@angular/core';
import { AuthManagerService } from 'ngx-jwt-auth';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet]
})
export class AppComponent {
  title = 'ngx-jwt-auth-example-app';

  constructor(private readonly authManagerService: AuthManagerService){
    this.init ();
  }

  private async init (): Promise<void> {
    console.log(await this.authManagerService.getAuthorization());
  }
}
