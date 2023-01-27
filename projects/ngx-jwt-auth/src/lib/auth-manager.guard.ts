import { Inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthManagerService } from './auth-manager.service';
import { EnvironmentConfig } from './environment-config.interface';
import EnvironmentConfigService from './environment-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(EnvironmentConfigService) private config: EnvironmentConfig,
    private authManagerService: AuthManagerService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authManagerService.getLoggedInUser().then((user) => {
        // Pages that only super admin can access
        const superAdminRoutes: string[] = this.config.superAdminPages || [];

        if (superAdminRoutes.some((route: string) => url.startsWith(`/${route}`)) && !user.isSuperAdmin) {
          reject(false);

          throw Error('Only super admins have access to this page!');
        } else {
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
