import { Observable } from 'rxjs';
import { JwtAuthService } from './jwt-auth.service';
import { AuthService } from './auth.service';
import { AuthDialogService } from './auth-dialog.service';
import User from './user.interface';
import JWT from './jwt.interface';
import JWTAndUser from './jwt-and-user.interface';
import * as i0 from "@angular/core";
export declare class AuthManagerService {
    private jwtAuthService;
    private authService;
    private authDialogService;
    private redirectUrl?;
    constructor(jwtAuthService: JwtAuthService, authService: AuthService, authDialogService: AuthDialogService);
    /**
     * Just check if there's auth
     */
    private isAuth;
    auth(email: string, password: string): Observable<{
        message: string;
        jwt: JWT;
    }>;
    /**
     *
     * @param force if user not logged in, force authentication by showing login popup dialog
     * @param dontCheckAuth If true, dont check if user is authed, just return last user auth data
     */
    getAuthAndUser(force?: boolean, dontCheckAuth?: boolean): Promise<JWTAndUser>;
    getLoggedInUser(forceAuth?: boolean): Promise<User>;
    getAuthorization(forceAuth?: boolean): Promise<string>;
    logout(): Observable<any>;
    setRedirectUrl(url: string): void;
    getRedirectUrl(): string | undefined;
    resetRedirectUrl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthManagerService>;
}
