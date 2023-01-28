import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHelpers } from './http-helpers';
import HttpError from './http-error';
import EnvironmentConfigService from './environment-config.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AuthService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
    }
    auth(email, password) {
        return this.http.post(this.config.loginUrl, { email, password })
            .pipe(HttpHelpers.retry(), catchError((err, caught) => {
            switch (err.status) {
                case 401:
                    return throwError(() => new HttpError('Email/Password combination is incorrect', err.status));
                case 500:
                    return throwError(() => new HttpError('Problem logging in, please try again', err.status));
                case 0:
                default:
                    return throwError(() => new HttpError('Problem logging in, please check network and try again', err.status));
            }
            ;
        }), map((jwt) => {
            return { message: 'Successfully logged in', jwt };
        }));
    }
    logout() {
        return this.http.delete(this.config.logoutUrl)
            .pipe(HttpHelpers.retry(), catchError((err) => {
            switch (err.status) {
                case 401:
                    return throwError(() => new HttpError('User wasn\'t authed', err.status));
                case 500:
                    return throwError(() => new HttpError('Problem logging out, please try again', err.status));
                case 0:
                default:
                    return throwError(() => new HttpError('Problem logging out, please check network and try again', err.status));
            }
        }), map(() => {
            return { message: 'Successfully logged out' };
        }));
    }
    forgotPassword(email) {
        return this.http.post(this.config.forgotPasswordUrl, { email }).pipe(HttpHelpers.retry(), catchError((err, caught) => {
            switch (err.status) {
                case 500:
                    return throwError(() => new HttpError('Problem sending otp, please try again', err.status));
                case 0:
                default:
                    return throwError(() => new HttpError((err.error?.message?.join && err.error?.message?.join(', ')) ?? err.error?.message ?? err?.message ?? 'Problem sending otp, please check network and try again', err.status));
            }
            ;
        }));
    }
    resetPassword(email, password, code) {
        return this.http.put(this.config.resetPasswordUrl, {
            code,
            email,
            password,
        }).pipe(HttpHelpers.retry(), catchError((err, caught) => {
            switch (err.status) {
                case 500:
                    return throwError(() => new HttpError('Problem reseting, please try again', err.status));
                case 0:
                default:
                    return throwError(() => new HttpError((err.error?.message?.join && err.error?.message?.join(', ')) ?? err.error?.message ?? err?.message ?? 'Problem reseting, please check network and try again', err.status));
            }
            ;
        }));
    }
}
AuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthService, deps: [{ token: EnvironmentConfigService }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
AuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }, { type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWp3dC1hdXRoL3NyYy9saWIvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxTQUFTLE1BQU0sY0FBYyxDQUFDO0FBQ3JDLE9BQU8sd0JBQXdCLE1BQU0sOEJBQThCLENBQUM7OztBQUtwRSxNQUFNLE9BQU8sV0FBVztJQUV0QixZQUM0QyxNQUF5QixFQUMzRCxJQUFnQjtRQURrQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUMzRCxTQUFJLEdBQUosSUFBSSxDQUFZO0lBQ3RCLENBQUM7SUFFRSxJQUFJLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDN0QsSUFBSSxDQUNILFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFDbkIsVUFBVSxDQUNSLENBQUMsR0FBRyxFQUFFLE1BQXVCLEVBQUUsRUFBRTtZQUMvQixRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLEtBQUssR0FBRztvQkFDTixPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyx5Q0FBeUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEcsS0FBSyxHQUFHO29CQUNOLE9B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WUFDSixLQUFLO1lBQ0wsUUFBUTtTQUNULENBQ0YsQ0FBQyxJQUFJLENBQ0osV0FBVyxDQUFDLEtBQUssRUFBRSxFQUNuQixVQUFVLENBQ1IsQ0FBQyxHQUFzQixFQUFFLE1BQXdCLEVBQUUsRUFBRTtZQUNuRCxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLEtBQUssR0FBRztvQkFDTixPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0YsS0FBSyxDQUFDLENBQUM7Z0JBQ1A7b0JBQ0UsT0FBTyxVQUFVLENBQ2YsR0FBRyxFQUFFLENBQUMsSUFBSSxTQUFTLENBQ2pCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxJQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksc0RBQXNELEVBQzVKLEdBQUcsQ0FBQyxNQUFNLENBQ1gsQ0FDRixDQUFDO2FBQ0w7WUFBQSxDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7O3dHQTdHVSxXQUFXLGtCQUdaLHdCQUF3Qjs0R0FIdkIsV0FBVyxjQUZWLE1BQU07MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUlJLE1BQU07MkJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgdGhyb3dFcnJvciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgSldUIGZyb20gJy4vand0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBIdHRwSGVscGVycyB9IGZyb20gJy4vaHR0cC1oZWxwZXJzJztcbmltcG9ydCB7IEVudmlyb25tZW50Q29uZmlnIH0gZnJvbSAnLi9lbnZpcm9ubWVudC1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCBIdHRwRXJyb3IgZnJvbSAnLi9odHRwLWVycm9yJztcbmltcG9ydCBFbnZpcm9ubWVudENvbmZpZ1NlcnZpY2UgZnJvbSAnLi9lbnZpcm9ubWVudC1jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEVudmlyb25tZW50Q29uZmlnU2VydmljZSkgcHJpdmF0ZSBjb25maWc6IEVudmlyb25tZW50Q29uZmlnLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgKSB7IH1cblxuICBwdWJsaWMgYXV0aChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx7IG1lc3NhZ2U6IHN0cmluZywgand0OiBKV1QgfT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmNvbmZpZy5sb2dpblVybCwgeyBlbWFpbCwgcGFzc3dvcmQgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBIdHRwSGVscGVycy5yZXRyeSgpLFxuICAgICAgICBjYXRjaEVycm9yKFxuICAgICAgICAgIChlcnIsIGNhdWdodDogT2JzZXJ2YWJsZTxKV1Q+KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVyci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgY2FzZSA0MDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gbmV3IEh0dHBFcnJvcignRW1haWwvUGFzc3dvcmQgY29tYmluYXRpb24gaXMgaW5jb3JyZWN0JywgZXJyLnN0YXR1cykpO1xuICAgICAgICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgSHR0cEVycm9yKCdQcm9ibGVtIGxvZ2dpbmcgaW4sIHBsZWFzZSB0cnkgYWdhaW4nLCBlcnIuc3RhdHVzKSk7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgSHR0cEVycm9yKCdQcm9ibGVtIGxvZ2dpbmcgaW4sIHBsZWFzZSBjaGVjayBuZXR3b3JrIGFuZCB0cnkgYWdhaW4nLCBlcnIuc3RhdHVzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG4gICAgICAgICksXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoand0OiBKV1QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6ICdTdWNjZXNzZnVsbHkgbG9nZ2VkIGluJywgand0IH07XG4gICAgICAgICAgfSxcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2dvdXQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh0aGlzLmNvbmZpZy5sb2dvdXRVcmwpXG4gICAgICAucGlwZShcbiAgICAgICAgSHR0cEhlbHBlcnMucmV0cnkoKSxcbiAgICAgICAgY2F0Y2hFcnJvcihcbiAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVyci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgY2FzZSA0MDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gbmV3IEh0dHBFcnJvcignVXNlciB3YXNuXFwndCBhdXRoZWQnLCBlcnIuc3RhdHVzKSk7XG4gICAgICAgICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKCgpID0+IG5ldyBIdHRwRXJyb3IoJ1Byb2JsZW0gbG9nZ2luZyBvdXQsIHBsZWFzZSB0cnkgYWdhaW4nLCBlcnIuc3RhdHVzKSk7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgSHR0cEVycm9yKCdQcm9ibGVtIGxvZ2dpbmcgb3V0LCBwbGVhc2UgY2hlY2sgbmV0d29yayBhbmQgdHJ5IGFnYWluJywgZXJyLnN0YXR1cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICksXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiAnU3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3Jnb3RQYXNzd29yZChlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgdGhpcy5jb25maWcuZm9yZ290UGFzc3dvcmRVcmwsXG4gICAgICB7IGVtYWlsIH0sXG4gICAgKS5waXBlKFxuICAgICAgSHR0cEhlbHBlcnMucmV0cnkoKSxcbiAgICAgIGNhdGNoRXJyb3IoXG4gICAgICAgIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlLCBjYXVnaHQ6IE9ic2VydmFibGU8dm9pZD4pID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGVyci5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgSHR0cEVycm9yKCdQcm9ibGVtIHNlbmRpbmcgb3RwLCBwbGVhc2UgdHJ5IGFnYWluJywgZXJyLnN0YXR1cykpO1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoXG4gICAgICAgICAgICAgICAgKCkgPT4gbmV3IEh0dHBFcnJvcihcbiAgICAgICAgICAgICAgICAgIChlcnIuZXJyb3I/Lm1lc3NhZ2U/LmpvaW4gJiYgZXJyLmVycm9yPy5tZXNzYWdlPy5qb2luKCcsICcpKSA/PyBlcnIuZXJyb3I/Lm1lc3NhZ2UgPz8gZXJyPy5tZXNzYWdlID8/ICdQcm9ibGVtIHNlbmRpbmcgb3RwLCBwbGVhc2UgY2hlY2sgbmV0d29yayBhbmQgdHJ5IGFnYWluJyxcbiAgICAgICAgICAgICAgICAgIGVyci5zdGF0dXMsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlc2V0UGFzc3dvcmQoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgY29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoXG4gICAgICB0aGlzLmNvbmZpZy5yZXNldFBhc3N3b3JkVXJsLFxuICAgICAge1xuICAgICAgICBjb2RlLFxuICAgICAgICBlbWFpbCxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICB9LFxuICAgICkucGlwZShcbiAgICAgIEh0dHBIZWxwZXJzLnJldHJ5KCksXG4gICAgICBjYXRjaEVycm9yKFxuICAgICAgICAoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSwgY2F1Z2h0OiBPYnNlcnZhYmxlPHZvaWQ+KSA9PiB7XG4gICAgICAgICAgc3dpdGNoIChlcnIuc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gbmV3IEh0dHBFcnJvcignUHJvYmxlbSByZXNldGluZywgcGxlYXNlIHRyeSBhZ2FpbicsIGVyci5zdGF0dXMpKTtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKFxuICAgICAgICAgICAgICAgICgpID0+IG5ldyBIdHRwRXJyb3IoXG4gICAgICAgICAgICAgICAgICAoZXJyLmVycm9yPy5tZXNzYWdlPy5qb2luICYmIGVyci5lcnJvcj8ubWVzc2FnZT8uam9pbignLCAnKSkgPz8gZXJyLmVycm9yPy5tZXNzYWdlID8/IGVycj8ubWVzc2FnZSA/PyAnUHJvYmxlbSByZXNldGluZywgcGxlYXNlIGNoZWNrIG5ldHdvcmsgYW5kIHRyeSBhZ2FpbicsXG4gICAgICAgICAgICAgICAgICBlcnIuc3RhdHVzLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcbiAgfVxufVxuIl19