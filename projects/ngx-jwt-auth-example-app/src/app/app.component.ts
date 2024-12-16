import { Component } from '@angular/core';
import { AuthManagerService } from 'ngx-jwt-auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
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
