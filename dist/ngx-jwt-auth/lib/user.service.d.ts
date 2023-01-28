import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from './user.interface';
import { EnvironmentConfig } from './environment-config.interface';
import * as i0 from "@angular/core";
export declare class UserService {
    private config;
    private http;
    constructor(config: EnvironmentConfig, http: HttpClient);
    getProfile(): Observable<{
        profile: User;
        message: string;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserService>;
}
