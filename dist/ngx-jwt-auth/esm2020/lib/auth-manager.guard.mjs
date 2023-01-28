import { Inject, Injectable } from '@angular/core';
import EnvironmentConfigService from './environment-config.service';
import * as i0 from "@angular/core";
import * as i1 from "./auth-manager.service";
import * as i2 from "@angular/router";
export class AuthManagerGuard {
    constructor(config, authManagerService, router) {
        this.config = config;
        this.authManagerService = authManagerService;
        this.router = router;
    }
    canActivate(next, state) {
        const url = state.url;
        return this.checkLogin(url);
    }
    canActivateChild(next, state) {
        const url = state.url;
        return this.checkLogin(url);
    }
    checkLogin(url) {
        return new Promise((resolve, reject) => {
            this.authManagerService.getLoggedInUser().then((user) => {
                // Pages that only super admin can access
                const superAdminRoutes = this.config.superAdminPages || [];
                if (superAdminRoutes.some((route) => url.startsWith(`/${route}`)) && !user.isSuperAdmin) {
                    reject(false);
                    throw Error('Only super admins have access to this page!');
                }
                else {
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
AuthManagerGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerGuard, deps: [{ token: EnvironmentConfigService }, { token: i1.AuthManagerService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
AuthManagerGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }, { type: i1.AuthManagerService }, { type: i2.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1tYW5hZ2VyLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWp3dC1hdXRoL3NyYy9saWIvYXV0aC1tYW5hZ2VyLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTW5ELE9BQU8sd0JBQXdCLE1BQU0sOEJBQThCLENBQUM7Ozs7QUFLcEUsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUM0QyxNQUF5QixFQUMzRCxrQkFBc0MsRUFDdEMsTUFBYztRQUZvQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUMzRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDcEIsQ0FBQztJQUVMLFdBQVcsQ0FDVCxJQUE0QixFQUM1QixLQUEwQjtRQUMxQixNQUFNLEdBQUcsR0FBVyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRTlCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsZ0JBQWdCLENBQ2QsSUFBNEIsRUFDNUIsS0FBMEI7UUFDMUIsTUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU5QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN0RCx5Q0FBeUM7Z0JBQ3pDLE1BQU0sZ0JBQWdCLEdBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO2dCQUVyRSxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQy9GLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFZCxNQUFNLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO2lCQUM1RDtxQkFBTTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2Y7WUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNaLGlCQUFpQjtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzZHQTFDVSxnQkFBZ0Isa0JBRWpCLHdCQUF3QjtpSEFGdkIsZ0JBQWdCLGNBRmYsTUFBTTsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFHSSxNQUFNOzJCQUFDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEF1dGhNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4vYXV0aC1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRDb25maWcgfSBmcm9tICcuL2Vudmlyb25tZW50LWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IEVudmlyb25tZW50Q29uZmlnU2VydmljZSBmcm9tICcuL2Vudmlyb25tZW50LWNvbmZpZy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aE1hbmFnZXJHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFbnZpcm9ubWVudENvbmZpZ1NlcnZpY2UpIHByaXZhdGUgY29uZmlnOiBFbnZpcm9ubWVudENvbmZpZyxcbiAgICBwcml2YXRlIGF1dGhNYW5hZ2VyU2VydmljZTogQXV0aE1hbmFnZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICkgeyB9XG5cbiAgY2FuQWN0aXZhdGUoXG4gICAgbmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHwgUHJvbWlzZTxib29sZWFuIHwgVXJsVHJlZT4gfCBib29sZWFuIHwgVXJsVHJlZSB7XG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSBzdGF0ZS51cmw7XG5cbiAgICByZXR1cm4gdGhpcy5jaGVja0xvZ2luKHVybCk7XG4gIH1cbiAgY2FuQWN0aXZhdGVDaGlsZChcbiAgICBuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4gfCBQcm9taXNlPGJvb2xlYW4gfCBVcmxUcmVlPiB8IGJvb2xlYW4gfCBVcmxUcmVlIHtcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHN0YXRlLnVybDtcblxuICAgIHJldHVybiB0aGlzLmNoZWNrTG9naW4odXJsKTtcbiAgfVxuXG4gIGNoZWNrTG9naW4odXJsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5hdXRoTWFuYWdlclNlcnZpY2UuZ2V0TG9nZ2VkSW5Vc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAvLyBQYWdlcyB0aGF0IG9ubHkgc3VwZXIgYWRtaW4gY2FuIGFjY2Vzc1xuICAgICAgICBjb25zdCBzdXBlckFkbWluUm91dGVzOiBzdHJpbmdbXSA9IHRoaXMuY29uZmlnLnN1cGVyQWRtaW5QYWdlcyB8fCBbXTtcblxuICAgICAgICBpZiAoc3VwZXJBZG1pblJvdXRlcy5zb21lKChyb3V0ZTogc3RyaW5nKSA9PiB1cmwuc3RhcnRzV2l0aChgLyR7cm91dGV9YCkpICYmICF1c2VyLmlzU3VwZXJBZG1pbikge1xuICAgICAgICAgIHJlamVjdChmYWxzZSk7XG5cbiAgICAgICAgICB0aHJvdyBFcnJvcignT25seSBzdXBlciBhZG1pbnMgaGF2ZSBhY2Nlc3MgdG8gdGhpcyBwYWdlIScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gcmVkaXJlY3QgdG8gbWVcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydhdXRoJ10pO1xuXG4gICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19