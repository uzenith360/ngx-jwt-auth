import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import JWT from './jwt.interface';
import { EnvironmentConfig } from './environment-config.interface';
import * as i0 from "@angular/core";
export declare class AuthService {
    private config;
    private http;
    constructor(config: EnvironmentConfig, http: HttpClient);
    auth(email: string, password: string): Observable<{
        message: string;
        jwt: JWT;
    }>;
    logout(): Observable<any>;
    forgotPassword(email: string): Observable<void>;
    resetPassword(email: string, password: string, code: string): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}
