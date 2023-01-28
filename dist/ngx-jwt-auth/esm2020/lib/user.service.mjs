import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHelpers } from './http-helpers';
import EnvironmentConfigService from './environment-config.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class UserService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
    }
    getProfile() {
        return this.http.get(this.config.getLoggedinUserProfileUrl)
            .pipe(HttpHelpers.retry(), catchError((err, caught) => {
            switch (err.status) {
                case 500:
                    return throwError({ message: 'Problem getting profile, please try again', status: err.status });
                case 0:
                default:
                    return throwError({ message: 'Problem getting profile, please check network and try again', status: err.status });
            }
        }), map((profile) => {
            return { message: 'Successfully logged in', profile };
        }));
    }
}
UserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: UserService, deps: [{ token: EnvironmentConfigService }, { token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
UserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: UserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: UserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }, { type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWp3dC1hdXRoL3NyYy9saWIvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyx3QkFBd0IsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBS3BFLE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFlBQzRDLE1BQXlCLEVBQzNELElBQWdCO1FBRGtCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQzNELFNBQUksR0FBSixJQUFJLENBQVk7SUFDcEIsQ0FBQztJQUVBLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUM7YUFDeEQsSUFBSSxDQUNILFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFDbkIsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQXdCLEVBQUUsRUFBRTtZQUMzQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLEtBQUssR0FBRztvQkFDTixPQUFPLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQ2xHLEtBQUssQ0FBQyxDQUFDO2dCQUNQO29CQUNFLE9BQU8sVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLDZEQUE2RCxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUNySDtRQUNILENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxDQUFDLE9BQWEsRUFBRSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7O3dHQXZCVSxXQUFXLGtCQUVaLHdCQUF3Qjs0R0FGdkIsV0FBVyxjQUZWLE1BQU07MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUdJLE1BQU07MkJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyB0aHJvd0Vycm9yLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSHR0cEhlbHBlcnMgfSBmcm9tICcuL2h0dHAtaGVscGVycyc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudENvbmZpZyB9IGZyb20gJy4vZW52aXJvbm1lbnQtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgRW52aXJvbm1lbnRDb25maWdTZXJ2aWNlIGZyb20gJy4vZW52aXJvbm1lbnQtY29uZmlnLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRW52aXJvbm1lbnRDb25maWdTZXJ2aWNlKSBwcml2YXRlIGNvbmZpZzogRW52aXJvbm1lbnRDb25maWcsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICkgeyB9XG5cbiAgcHVibGljIGdldFByb2ZpbGUoKTogT2JzZXJ2YWJsZTx7cHJvZmlsZTogVXNlciwgbWVzc2FnZTogc3RyaW5nfT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY29uZmlnLmdldExvZ2dlZGluVXNlclByb2ZpbGVVcmwpXG4gICAgICAucGlwZShcbiAgICAgICAgSHR0cEhlbHBlcnMucmV0cnkoKSxcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyLCBjYXVnaHQ6IE9ic2VydmFibGU8VXNlcj4pID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGVyci5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcih7IG1lc3NhZ2U6ICdQcm9ibGVtIGdldHRpbmcgcHJvZmlsZSwgcGxlYXNlIHRyeSBhZ2FpbicsIHN0YXR1czogZXJyLnN0YXR1cyB9KTtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgbWVzc2FnZTogJ1Byb2JsZW0gZ2V0dGluZyBwcm9maWxlLCBwbGVhc2UgY2hlY2sgbmV0d29yayBhbmQgdHJ5IGFnYWluJywgc3RhdHVzOiBlcnIuc3RhdHVzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgocHJvZmlsZTogVXNlcikgPT4ge1xuICAgICAgICAgIHJldHVybiB7IG1lc3NhZ2U6ICdTdWNjZXNzZnVsbHkgbG9nZ2VkIGluJywgcHJvZmlsZSB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxufVxuXG4iXX0=