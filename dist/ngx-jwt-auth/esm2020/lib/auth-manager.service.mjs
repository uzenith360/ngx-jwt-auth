import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import AuthError from './auth-error';
import * as i0 from "@angular/core";
import * as i1 from "./jwt-auth.service";
import * as i2 from "./auth.service";
import * as i3 from "./auth-dialog.service";
export class AuthManagerService {
    constructor(jwtAuthService, authService, authDialogService) {
        this.jwtAuthService = jwtAuthService;
        this.authService = authService;
        this.authDialogService = authDialogService;
    }
    /**
     * Just check if there's auth
     */
    isAuth() {
        return !this.jwtAuthService.check();
    }
    auth(email, password) {
        return this.authService.auth(email, password)
            .pipe(map(({ message, jwt }) => {
            this.jwtAuthService.set(jwt);
            return { message, jwt };
        }));
    }
    /**
     *
     * @param force if user not logged in, force authentication by showing login popup dialog
     * @param dontCheckAuth If true, dont check if user is authed, just return last user auth data
     */
    getAuthAndUser(force = true, dontCheckAuth = false) {
        if (dontCheckAuth || this.isAuth()) {
            const jwtAndUser = this.jwtAuthService.getJWTAndUser();
            if (!!jwtAndUser) {
                return Promise.resolve(jwtAndUser);
            }
            else {
                return Promise.reject(Error('No authed'));
            }
        }
        else if (force) {
            return new Promise((resolve, reject) => {
                this.authDialogService
                    .open()
                    .then((jwtAndUser) => {
                    this.jwtAuthService.set(jwtAndUser.jwt);
                    resolve(jwtAndUser);
                }).catch((err) => reject(new AuthError(err?.message)));
            });
        }
        else {
            return Promise.reject(new AuthError('User isnt authed'));
        }
    }
    getLoggedInUser(forceAuth = true) {
        return new Promise((resolve, reject) => {
            this.getAuthAndUser(forceAuth)
                .then(({ user }) => resolve(user /* && jwtAndUser.user || this.JwtAuthService.getUser()*/))
                .catch((err) => reject(err));
        });
    }
    getAuthorization(forceAuth = true) {
        return new Promise((resolve, reject) => {
            this.getAuthAndUser(forceAuth)
                .then(({ jwt: { access_token, token_type } }) => resolve(`${token_type} ${access_token}`))
                .catch((err) => reject(err));
        });
    }
    // public updateUser(user: any): void {
    //   this.JwtAuthService.setUser(user);
    // }
    // public logout(): void {
    //   return this.JwtAuthService.clear();
    // }
    logout() {
        return this.authService.logout()
            .pipe(map(({ message }) => {
            this.jwtAuthService.clear();
            return { message };
        }));
    }
    setRedirectUrl(url) {
        this.redirectUrl = url;
    }
    getRedirectUrl() {
        return this.redirectUrl;
    }
    resetRedirectUrl() {
        this.redirectUrl = undefined;
    }
}
AuthManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerService, deps: [{ token: i1.JwtAuthService }, { token: i2.AuthService }, { token: i3.AuthDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.JwtAuthService }, { type: i2.AuthService }, { type: i3.AuthDialogService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtand0LWF1dGgvc3JjL2xpYi9hdXRoLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVFyQyxPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUM7Ozs7O0FBTXJDLE1BQU0sT0FBTyxrQkFBa0I7SUFHN0IsWUFDVSxjQUE4QixFQUM5QixXQUF3QixFQUN4QixpQkFBb0M7UUFGcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDMUMsQ0FBQztJQUVMOztPQUVHO0lBQ0ssTUFBTTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxJQUFJLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQzthQUMxQyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU3QixPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGNBQWMsQ0FBQyxRQUFpQixJQUFJLEVBQUUsZ0JBQXlCLEtBQUs7UUFDekUsSUFBSSxhQUFhLElBQUksSUFBSSxDQUFD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LENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDOzsrR0FyR1Usa0JBQWtCO21IQUFsQixrQkFBa0IsY0FGakIsTUFBTTsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEp3dEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9qd3QtYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBdXRoRGlhbG9nU2VydmljZSB9IGZyb20gJy4vYXV0aC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCBKV1QgZnJvbSAnLi9qd3QuaW50ZXJmYWNlJztcbmltcG9ydCBBdXRoRXJyb3IgZnJvbSAnLi9hdXRoLWVycm9yJztcbmltcG9ydCBKV1RBbmRVc2VyIGZyb20gJy4vand0LWFuZC11c2VyLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhNYW5hZ2VyU2VydmljZSB7XG4gIHByaXZhdGUgcmVkaXJlY3RVcmw/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBqd3RBdXRoU2VydmljZTogSnd0QXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdXRoRGlhbG9nU2VydmljZTogQXV0aERpYWxvZ1NlcnZpY2VcbiAgKSB7IH1cblxuICAvKipcbiAgICogSnVzdCBjaGVjayBpZiB0aGVyZSdzIGF1dGhcbiAgICovXG4gIHByaXZhdGUgaXNBdXRoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5qd3RBdXRoU2VydmljZS5jaGVjaygpO1xuICB9XG5cbiAgcHVibGljIGF1dGgoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8eyBtZXNzYWdlOiBzdHJpbmcsIGp3dDogSldUIH0+IHtcbiAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5hdXRoKGVtYWlsLCBwYXNzd29yZClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHsgbWVzc2FnZSwgand0IH0pID0+IHtcbiAgICAgICAgICB0aGlzLmp3dEF1dGhTZXJ2aWNlLnNldChqd3QpO1xuXG4gICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZSwgand0IH07XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBmb3JjZSBpZiB1c2VyIG5vdCBsb2dnZWQgaW4sIGZvcmNlIGF1dGhlbnRpY2F0aW9uIGJ5IHNob3dpbmcgbG9naW4gcG9wdXAgZGlhbG9nXG4gICAqIEBwYXJhbSBkb250Q2hlY2tBdXRoIElmIHRydWUsIGRvbnQgY2hlY2sgaWYgdXNlciBpcyBhdXRoZWQsIGp1c3QgcmV0dXJuIGxhc3QgdXNlciBhdXRoIGRhdGFcbiAgICovXG4gIHB1YmxpYyBnZXRBdXRoQW5kVXNlcihmb3JjZTogYm9vbGVhbiA9IHRydWUsIGRvbnRDaGVja0F1dGg6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8SldUQW5kVXNlcj4ge1xuICAgIGlmIChkb250Q2hlY2tBdXRoIHx8IHRoaXMuaXNBdXRoKCkpIHtcbiAgICAgIGNvbnN0IGp3dEFuZFVzZXI6IEpXVEFuZFVzZXIgfCBudWxsID0gdGhpcy5qd3RBdXRoU2VydmljZS5nZXRKV1RBbmRVc2VyKCk7XG5cbiAgICAgIGlmICghIWp3dEFuZFVzZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShqd3RBbmRVc2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvcignTm8gYXV0aGVkJykpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZm9yY2UpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuYXV0aERpYWxvZ1NlcnZpY2VcbiAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgLnRoZW4oKGp3dEFuZFVzZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuand0QXV0aFNlcnZpY2Uuc2V0KGp3dEFuZFVzZXIuand0KTtcblxuICAgICAgICAgICAgcmVzb2x2ZShqd3RBbmRVc2VyKTtcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiByZWplY3QobmV3IEF1dGhFcnJvcihlcnI/Lm1lc3NhZ2UpKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBdXRoRXJyb3IoJ1VzZXIgaXNudCBhdXRoZWQnKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldExvZ2dlZEluVXNlcihmb3JjZUF1dGg6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZ2V0QXV0aEFuZFVzZXIoZm9yY2VBdXRoKVxuICAgICAgICAudGhlbigoeyB1c2VyIH0pID0+IHJlc29sdmUodXNlciAvKiAmJiBqd3RBbmRVc2VyLnVzZXIgfHwgdGhpcy5Kd3RBdXRoU2VydmljZS5nZXRVc2VyKCkqLykpXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXV0aG9yaXphdGlvbihmb3JjZUF1dGg6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5nZXRBdXRoQW5kVXNlcihmb3JjZUF1dGgpXG4gICAgICAgIC50aGVuKCh7IGp3dDogeyBhY2Nlc3NfdG9rZW4sIHRva2VuX3R5cGUgfSB9KSA9PiByZXNvbHZlKGAke3Rva2VuX3R5cGV9ICR7YWNjZXNzX3Rva2VufWApKVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gcmVqZWN0KGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcHVibGljIHVwZGF0ZVVzZXIodXNlcjogYW55KTogdm9pZCB7XG4gIC8vICAgdGhpcy5Kd3RBdXRoU2VydmljZS5zZXRVc2VyKHVzZXIpO1xuICAvLyB9XG5cbiAgLy8gcHVibGljIGxvZ291dCgpOiB2b2lkIHtcbiAgLy8gICByZXR1cm4gdGhpcy5Kd3RBdXRoU2VydmljZS5jbGVhcigpO1xuICAvLyB9XG5cbiAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh7IG1lc3NhZ2UgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuand0QXV0aFNlcnZpY2UuY2xlYXIoKTtcblxuICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2UgfTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgc2V0UmVkaXJlY3RVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlZGlyZWN0VXJsID0gdXJsO1xuICB9XG5cbiAgcHVibGljIGdldFJlZGlyZWN0VXJsKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucmVkaXJlY3RVcmw7XG4gIH1cblxuICBwdWJsaWMgcmVzZXRSZWRpcmVjdFVybCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZGlyZWN0VXJsID0gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=