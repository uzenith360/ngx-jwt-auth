import { AuthInterceptorService as JWTAuthInterceptorService } from './auth-interceptor.service';
/** Http interceptor providers in outside-in order */
export declare const authHttpInterceptorProvider: {
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof JWTAuthInterceptorService;
    multi: boolean;
}[];
