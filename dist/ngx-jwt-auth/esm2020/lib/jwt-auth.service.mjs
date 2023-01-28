import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import EnvironmentConfigService from './environment-config.service';
import * as i0 from "@angular/core";
export class JwtAuthService {
    constructor(config) {
        this.config = config;
        this.storeId = config.tokenStoreId;
    }
    getJWTAndUser() {
        const jwt = this.get();
        return !!jwt
            ? {
                jwt,
                user: this.decode(jwt),
            } : null;
    }
    getJWT() {
        return this.get();
        // const jwt: JWT | null = this.get();
        // return !!jwt
        //   ? {
        //     access_token: jwt.access_token,
        //     // expires_in: jwt.expires_in,
        //     token_type: jwt.token_type,
        //   } : null;
    }
    getUser() {
        const jwt = this.get();
        return !!jwt ? this.decode(jwt) : null;
    }
    // public setUser(user: User): void {
    //   const jwt = this.getJWTAndUser();
    //   if (jwt) {
    //     jwt.user = user;
    //     this.set(jwt);
    //   }
    // }
    set(jwt) {
        localStorage.setItem(this.storeId, JSON.stringify(jwt));
    }
    get() {
        try {
            const sessionItem = localStorage.getItem(this.storeId);
            if (!!sessionItem) {
                return JSON.parse(sessionItem);
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }
    check() {
        const jwt = this.getJWT();
        if (!!jwt) {
            return JwtAuthService.helper.isTokenExpired(jwt.access_token);
        }
        else {
            return true;
        }
    }
    decode(jwt) {
        try {
            const accessToken = jwt?.access_token;
            return !!accessToken
                ? JwtAuthService.helper.decodeToken(accessToken)
                : null;
        }
        catch (e) {
            return null;
        }
    }
    clear() {
        localStorage.removeItem(this.storeId);
    }
}
JwtAuthService.helper = new JwtHelperService();
JwtAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthService, deps: [{ token: EnvironmentConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
JwtAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EnvironmentConfigService]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWF1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1qd3QtYXV0aC9zcmMvbGliL2p3dC1hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFJdEQsT0FBTyx3QkFBd0IsTUFBTSw4QkFBOEIsQ0FBQzs7QUFNcEUsTUFBTSxPQUFPLGNBQWM7SUFJekIsWUFBc0QsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDN0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxhQUFhO1FBQ2xCLE1BQU0sR0FBRyxHQUFlLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVuQyxPQUFPLENBQUMsQ0FBQyxHQUFHO1lBQ1YsQ0FBQyxDQUFDO2dCQUNBLEdBQUc7Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFTO2FBQy9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNiLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsc0NBQXNDO1FBRXRDLGVBQWU7UUFDZixRQUFRO1FBQ1Isc0NBQXNDO1FBQ3RDLHFDQUFxQztRQUNyQyxrQ0FBa0M7UUFDbEMsY0FBYztJQUNoQixDQUFDO0lBRU0sT0FBTztRQUNaLE1BQU0sR0FBRyxHQUFlLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVuQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRCxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLHNDQUFzQztJQUV0QyxlQUFlO0lBQ2YsdUJBQXVCO0lBRXZCLHFCQUFxQjtJQUNyQixNQUFNO0lBQ04sSUFBSTtJQUVHLEdBQUcsQ0FBQyxHQUFRO1FBQ2pCLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVPLEdBQUc7UUFDVCxJQUFJO1lBQ0YsTUFBTSxXQUFXLEdBQWtCLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXRFLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRTtnQkFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBUSxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRTtZQUNULE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxHQUFRO1FBQ3JCLElBQUk7WUFDRixNQUFNLFdBQVcsR0FDYixHQUFHLEVBQUUsWUFBWSxDQUFDO1lBRXRCLE9BQU8sQ0FBQyxDQUFDLFdBQVc7Z0JBQ2xCLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FDakMsV0FBVyxDQUNaO2dCQUNELENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDVjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7QUF6RmMscUJBQU0sR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDOzJHQUZ0RCxjQUFjLGtCQUlMLHdCQUF3QjsrR0FKakMsY0FBYyxjQUZiLE1BQU07MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUtjLE1BQU07MkJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEp3dEhlbHBlclNlcnZpY2UgfSBmcm9tICdAYXV0aDAvYW5ndWxhci1qd3QnO1xuaW1wb3J0IEpXVCBmcm9tICcuL2p3dC5pbnRlcmZhY2UnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudENvbmZpZyB9IGZyb20gJy4vZW52aXJvbm1lbnQtY29uZmlnLmludGVyZmFjZSc7XG5pbXBvcnQgRW52aXJvbm1lbnRDb25maWdTZXJ2aWNlIGZyb20gJy4vZW52aXJvbm1lbnQtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IEpXVEFuZFVzZXIgZnJvbSAnLi9qd3QtYW5kLXVzZXIuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSnd0QXV0aFNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JlSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBzdGF0aWMgaGVscGVyOiBKd3RIZWxwZXJTZXJ2aWNlID0gbmV3IEp3dEhlbHBlclNlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVudmlyb25tZW50Q29uZmlnU2VydmljZSkgcHJpdmF0ZSBjb25maWc6IEVudmlyb25tZW50Q29uZmlnLCkge1xuICAgIHRoaXMuc3RvcmVJZCA9IGNvbmZpZy50b2tlblN0b3JlSWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0SldUQW5kVXNlcigpOiBKV1RBbmRVc2VyIHwgbnVsbCB7XG4gICAgY29uc3Qgand0OiBKV1QgfCBudWxsID0gdGhpcy5nZXQoKTtcblxuICAgIHJldHVybiAhIWp3dFxuICAgICAgPyB7XG4gICAgICAgIGp3dCxcbiAgICAgICAgdXNlcjogdGhpcy5kZWNvZGUoand0KSBhcyBVc2VyLFxuICAgICAgfSA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgZ2V0SldUKCk6IEpXVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldCgpO1xuICAgIC8vIGNvbnN0IGp3dDogSldUIHwgbnVsbCA9IHRoaXMuZ2V0KCk7XG5cbiAgICAvLyByZXR1cm4gISFqd3RcbiAgICAvLyAgID8ge1xuICAgIC8vICAgICBhY2Nlc3NfdG9rZW46IGp3dC5hY2Nlc3NfdG9rZW4sXG4gICAgLy8gICAgIC8vIGV4cGlyZXNfaW46IGp3dC5leHBpcmVzX2luLFxuICAgIC8vICAgICB0b2tlbl90eXBlOiBqd3QudG9rZW5fdHlwZSxcbiAgICAvLyAgIH0gOiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldFVzZXIoKTogVXNlciB8IG51bGwge1xuICAgIGNvbnN0IGp3dDogSldUIHwgbnVsbCA9IHRoaXMuZ2V0KCk7XG5cbiAgICByZXR1cm4gISFqd3QgPyB0aGlzLmRlY29kZShqd3QpIGFzIFVzZXIgOiBudWxsO1xuICB9XG5cbiAgLy8gcHVibGljIHNldFVzZXIodXNlcjogVXNlcik6IHZvaWQge1xuICAvLyAgIGNvbnN0IGp3dCA9IHRoaXMuZ2V0SldUQW5kVXNlcigpO1xuXG4gIC8vICAgaWYgKGp3dCkge1xuICAvLyAgICAgand0LnVzZXIgPSB1c2VyO1xuXG4gIC8vICAgICB0aGlzLnNldChqd3QpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIHB1YmxpYyBzZXQoand0OiBKV1QpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnN0b3JlSWQsIEpTT04uc3RyaW5naWZ5KGp3dCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQoKTogSldUIHwgbnVsbCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNlc3Npb25JdGVtOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zdG9yZUlkKTtcblxuICAgICAgaWYgKCEhc2Vzc2lvbkl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvbkl0ZW0pIGFzIEpXVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjaGVjaygpOiBib29sZWFuIHtcbiAgICBjb25zdCBqd3QgPSB0aGlzLmdldEpXVCgpO1xuXG4gICAgaWYgKCEhand0KSB7XG4gICAgICByZXR1cm4gSnd0QXV0aFNlcnZpY2UuaGVscGVyLmlzVG9rZW5FeHBpcmVkKGp3dC5hY2Nlc3NfdG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlY29kZShqd3Q6IEpXVCk6IHVua25vd24gfCBudWxsIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICAgICA9IGp3dD8uYWNjZXNzX3Rva2VuO1xuXG4gICAgICByZXR1cm4gISFhY2Nlc3NUb2tlblxuICAgICAgICA/IEp3dEF1dGhTZXJ2aWNlLmhlbHBlci5kZWNvZGVUb2tlbihcbiAgICAgICAgICBhY2Nlc3NUb2tlbixcbiAgICAgICAgKVxuICAgICAgICA6IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuc3RvcmVJZCk7XG4gIH1cblxufVxuIl19