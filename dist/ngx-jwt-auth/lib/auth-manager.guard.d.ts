import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthManagerService } from './auth-manager.service';
import { EnvironmentConfig } from './environment-config.interface';
import * as i0 from "@angular/core";
export declare class AuthManagerGuard implements CanActivate, CanActivateChild {
    private config;
    private authManagerService;
    private router;
    constructor(config: EnvironmentConfig, authManagerService: AuthManagerService, router: Router);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    checkLogin(url: string): Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthManagerGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthManagerGuard>;
}
