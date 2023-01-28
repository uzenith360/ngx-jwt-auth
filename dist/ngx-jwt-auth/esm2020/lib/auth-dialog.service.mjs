import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
export class AuthDialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    open() {
        if (AuthDialogService.isInstanceOpen === true) {
            return new Promise((resolve, reject) => {
                AuthDialogService.loginSuccessSubject$.subscribe((jwt) => {
                    !!jwt ? resolve(jwt) : reject(null);
                });
            });
        }
        AuthDialogService.isInstanceOpen = true;
        return new Promise((resolve, reject) => {
            const dialogRef = this.dialog.open(AuthModalComponent, {
                restoreFocus: true,
                disableClose: true,
                data: {}
            });
            dialogRef.afterClosed().subscribe((jwt) => {
                jwt ? resolve(jwt) : reject(null);
                AuthDialogService.LoginSuccessSubject.next(jwt);
                AuthDialogService.isInstanceOpen = false;
            });
        });
    }
}
AuthDialogService.isInstanceOpen = false;
AuthDialogService.LoginSuccessSubject = new Subject();
AuthDialogService.loginSuccessSubject$ = AuthDialogService.LoginSuccessSubject.asObservable();
AuthDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthDialogService, deps: [{ token: i1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable });
AuthDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthDialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AuthDialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1kaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1qd3QtYXV0aC9zcmMvbGliL2F1dGgtZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFNdkUsTUFBTSxPQUFPLGlCQUFpQjtJQU01QixZQUFvQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUksQ0FBQztJQUUxQyxJQUFJO1FBQ0YsSUFBSSxpQkFBaUIsQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFO1lBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3JDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FDOUMsQ0FBQyxHQUFnQixFQUFFLEVBQUU7b0JBQ25CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQ0YsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxpQkFBaUIsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXhDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ3JELFlBQVksRUFBRSxJQUFJO2dCQUNsQixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsSUFBSSxFQUFFLEVBQUU7YUFDVCxDQUFDLENBQUM7WUFFSCxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBZ0IsRUFBRSxFQUFFO2dCQUNyRCxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVsQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRWhELGlCQUFpQixDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBcENjLGdDQUFjLEdBQVksS0FBSyxDQUFDO0FBQ2hDLHFDQUFtQixHQUFHLElBQUksT0FBTyxFQUEwQixDQUFDO0FBRTVELHNDQUFvQixHQUFHLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDOzhHQUpoRixpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBdXRoTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2F1dGgtbW9kYWwvYXV0aC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IEpXVEFuZFVzZXIgZnJvbSAnLi9qd3QtYW5kLXVzZXIuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aERpYWxvZ1NlcnZpY2Uge1xuICBwcml2YXRlIHN0YXRpYyBpc0luc3RhbmNlT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHN0YXRpYyBMb2dpblN1Y2Nlc3NTdWJqZWN0ID0gbmV3IFN1YmplY3Q8SldUQW5kVXNlciB8IHVuZGVmaW5lZD4oKTtcblxuICBwcml2YXRlIHN0YXRpYyBsb2dpblN1Y2Nlc3NTdWJqZWN0JCA9IEF1dGhEaWFsb2dTZXJ2aWNlLkxvZ2luU3VjY2Vzc1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgb3BlbigpOiBQcm9taXNlPEpXVEFuZFVzZXI+IHtcbiAgICBpZiAoQXV0aERpYWxvZ1NlcnZpY2UuaXNJbnN0YW5jZU9wZW4gPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIEF1dGhEaWFsb2dTZXJ2aWNlLmxvZ2luU3VjY2Vzc1N1YmplY3QkLnN1YnNjcmliZShcbiAgICAgICAgICAoand0PzogSldUQW5kVXNlcikgPT4ge1xuICAgICAgICAgICAgISFqd3QgPyByZXNvbHZlKGp3dCkgOiByZWplY3QobnVsbCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIEF1dGhEaWFsb2dTZXJ2aWNlLmlzSW5zdGFuY2VPcGVuID0gdHJ1ZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEF1dGhNb2RhbENvbXBvbmVudCwge1xuICAgICAgICByZXN0b3JlRm9jdXM6IHRydWUsXG4gICAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICAgICAgZGF0YToge31cbiAgICAgIH0pO1xuXG4gICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGp3dD86IEpXVEFuZFVzZXIpID0+IHtcbiAgICAgICAgand0ID8gcmVzb2x2ZShqd3QpIDogcmVqZWN0KG51bGwpO1xuXG4gICAgICAgIEF1dGhEaWFsb2dTZXJ2aWNlLkxvZ2luU3VjY2Vzc1N1YmplY3QubmV4dChqd3QpO1xuXG4gICAgICAgIEF1dGhEaWFsb2dTZXJ2aWNlLmlzSW5zdGFuY2VPcGVuID0gZmFsc2U7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9XG59XG4iXX0=