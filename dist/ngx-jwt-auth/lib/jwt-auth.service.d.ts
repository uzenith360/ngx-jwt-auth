import JWT from './jwt.interface';
import User from './user.interface';
import { EnvironmentConfig } from './environment-config.interface';
import JWTAndUser from './jwt-and-user.interface';
import * as i0 from "@angular/core";
export declare class JwtAuthService {
    private config;
    private readonly storeId;
    private static helper;
    constructor(config: EnvironmentConfig);
    getJWTAndUser(): JWTAndUser | null;
    getJWT(): JWT | null;
    getUser(): User | null;
    set(jwt: JWT): void;
    private get;
    check(): boolean;
    private decode;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JwtAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JwtAuthService>;
}
