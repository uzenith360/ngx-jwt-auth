import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import EnvironmentConfigService from './environment-config.service';
import * as i0 from "@angular/core";
import * as i1 from "./auth-manager.service";
export class AuthInterceptorService {
    constructor(config, authManagerService) {
        this.config = config;
        this.authManagerService = authManagerService;
    }
    intercept(req, next) {
        if (
        // ['login', 'forgot-password', 'reset-password'].includes(req.url.substring(req.url.lastIndexOf('/') + 1))
        [this.config.loginUrl, this.config.forgotPasswordUrl, this.config.resetPasswordUrl].includes(req.url)
            || req.headers.get("skip-interceptors")) {
            return next.handle(req);
        }
        return from(this.authManagerService.getAuthorization())
            .pipe(switchMap((authToken) => {
            // do the changes here
            const authReq = req.clone({ setHeaders: { Authorization: authToken } });
            return next.handle(authReq);
        }), catchError((e) => {
            return throwError(e && e.status ? e : new HttpErrorResponse({ status: 401 }));
        }));
    }
}
AuthInterceptorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthInterceptorService, deps: [{ token: EnvironmentConfigService }, { token: i1.AuthManagerService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthInterceptorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthInterceptorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthInterceptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }, { type: i1.AuthManagerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1pbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWp3dC1hdXRoL3NyYy9saWIvYXV0aC1pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBd0QsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUUvRyxPQUFPLEVBQWMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXZELE9BQU8sd0JBQXdCLE1BQU0sOEJBQThCLENBQUM7OztBQUtwRSxNQUFNLE9BQU8sc0JBQXNCO0lBRWpDLFlBQ3FELE1BQXlCLEVBQzNELGtCQUFzQztRQURKLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQzNELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFDckQsQ0FBQztJQUVMLFNBQVMsQ0FBQyxHQUFxQixFQUFFLElBQWlCO1FBQ2hEO1FBQ0UsMkdBQTJHO1FBQzNHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7ZUFDbEcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFDdkM7WUFDQSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekI7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUNwRCxJQUFJLENBQ0gsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdEIsc0JBQXNCO1lBQ3RCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNmLE9BQU8sVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDOzttSEE1QlUsc0JBQXNCLGtCQUd2Qix3QkFBd0I7dUhBSHZCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUlJLE1BQU07MkJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdCwgSHR0cEludGVyY2VwdG9yLCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBdXRoTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuL2F1dGgtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEVudmlyb25tZW50Q29uZmlnIH0gZnJvbSAnLi9lbnZpcm9ubWVudC1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCBFbnZpcm9ubWVudENvbmZpZ1NlcnZpY2UgZnJvbSAnLi9lbnZpcm9ubWVudC1jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvclNlcnZpY2UgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRW52aXJvbm1lbnRDb25maWdTZXJ2aWNlKSBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogRW52aXJvbm1lbnRDb25maWcsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhdXRoTWFuYWdlclNlcnZpY2U6IEF1dGhNYW5hZ2VyU2VydmljZVxuICApIHsgfVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGlmIChcbiAgICAgIC8vIFsnbG9naW4nLCAnZm9yZ290LXBhc3N3b3JkJywgJ3Jlc2V0LXBhc3N3b3JkJ10uaW5jbHVkZXMocmVxLnVybC5zdWJzdHJpbmcocmVxLnVybC5sYXN0SW5kZXhPZignLycpICsgMSkpXG4gICAgICBbdGhpcy5jb25maWcubG9naW5VcmwsIHRoaXMuY29uZmlnLmZvcmdvdFBhc3N3b3JkVXJsLCB0aGlzLmNvbmZpZy5yZXNldFBhc3N3b3JkVXJsXS5pbmNsdWRlcyhyZXEudXJsKVxuICAgICAgfHwgcmVxLmhlYWRlcnMuZ2V0KFwic2tpcC1pbnRlcmNlcHRvcnNcIilcbiAgICApIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH1cblxuICAgIHJldHVybiBmcm9tKHRoaXMuYXV0aE1hbmFnZXJTZXJ2aWNlLmdldEF1dGhvcml6YXRpb24oKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGF1dGhUb2tlbikgPT4ge1xuICAgICAgICAgIC8vIGRvIHRoZSBjaGFuZ2VzIGhlcmVcbiAgICAgICAgICBjb25zdCBhdXRoUmVxID0gcmVxLmNsb25lKHsgc2V0SGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBhdXRoVG9rZW4gfSB9KTtcblxuICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlICYmIGUuc3RhdHVzID8gZSA6IG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7IHN0YXR1czogNDAxIH0pKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==