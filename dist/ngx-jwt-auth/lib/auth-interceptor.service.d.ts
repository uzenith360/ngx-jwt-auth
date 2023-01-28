import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthManagerService } from './auth-manager.service';
import { EnvironmentConfig } from './environment-config.interface';
import * as i0 from "@angular/core";
export declare class AuthInterceptorService implements HttpInterceptor {
    private readonly config;
    private readonly authManagerService;
    constructor(config: EnvironmentConfig, authManagerService: AuthManagerService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthInterceptorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthInterceptorService>;
}
