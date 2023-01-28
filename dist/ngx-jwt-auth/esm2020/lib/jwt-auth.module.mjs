import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authHttpInterceptorProvider } from './auth-http-interceptor-provider';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthManagerService } from './auth-manager.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtAuthService } from './jwt-auth.service';
import { AuthDialogService } from './auth-dialog.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthManagerGuard } from './auth-manager.guard';
import EnvironmentConfigService from './environment-config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as i0 from "@angular/core";
export class JwtAuthModule {
    static forRoot(config) {
        return {
            ngModule: JwtAuthModule,
            providers: [
                authHttpInterceptorProvider,
                AuthInterceptorService,
                AuthManagerService,
                JwtAuthService,
                AuthDialogService,
                JwtHelperService,
                AuthManagerGuard,
                AuthService,
                UserService,
                {
                    provide: EnvironmentConfigService,
                    useValue: config,
                }
            ],
        };
    }
}
JwtAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
JwtAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthModule, declarations: [AuthModalComponent], imports: [CommonModule,
        HttpClientModule,
        MatDialogModule,
        MatRippleModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule] });
JwtAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthModule, imports: [CommonModule,
        HttpClientModule,
        MatDialogModule,
        MatRippleModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: JwtAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AuthModalComponent,
                    ],
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        MatDialogModule,
                        MatRippleModule,
                        BrowserAnimationsModule,
                        ReactiveFormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                    ],
                    providers: [],
                    exports: [],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWF1dGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWp3dC1hdXRoL3NyYy9saWIvand0LWF1dGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLHdCQUF3QixNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOztBQW1CL0UsTUFBTSxPQUFPLGFBQWE7SUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUF5QjtRQUN0QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNULDJCQUEyQjtnQkFDM0Isc0JBQXNCO2dCQUN0QixrQkFBa0I7Z0JBQ2xCLGNBQWM7Z0JBQ2QsaUJBQWlCO2dCQUNqQixnQkFBZ0I7Z0JBQ2hCLGdCQUFnQjtnQkFDaEIsV0FBVztnQkFDWCxXQUFXO2dCQUNYO29CQUNFLE9BQU8sRUFBRSx3QkFBd0I7b0JBQ2pDLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7OzBHQXBCVSxhQUFhOzJHQUFiLGFBQWEsaUJBZnRCLGtCQUFrQixhQUdsQixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixlQUFlO1FBQ2YsdUJBQXVCO1FBQ3ZCLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsY0FBYzsyR0FLTCxhQUFhLFlBWnRCLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGVBQWU7UUFDZix1QkFBdUI7UUFDdkIsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixjQUFjOzJGQUtMLGFBQWE7a0JBakJ6QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixrQkFBa0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLGNBQWM7cUJBQ2Y7b0JBQ0QsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsT0FBTyxFQUFFLEVBQUU7aUJBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGF1dGhIdHRwSW50ZXJjZXB0b3JQcm92aWRlciB9IGZyb20gJy4vYXV0aC1odHRwLWludGVyY2VwdG9yLXByb3ZpZGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRSaXBwbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IEF1dGhNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC1tb2RhbC9hdXRoLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdXRoTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuL2F1dGgtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBKd3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnQGF1dGgwL2FuZ3VsYXItand0JztcbmltcG9ydCB7IEp3dEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9qd3QtYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvclNlcnZpY2UgfSBmcm9tICcuL2F1dGgtaW50ZXJjZXB0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoTWFuYWdlckd1YXJkIH0gZnJvbSAnLi9hdXRoLW1hbmFnZXIuZ3VhcmQnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnRDb25maWcgfSBmcm9tICcuL2Vudmlyb25tZW50LWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IEVudmlyb25tZW50Q29uZmlnU2VydmljZSBmcm9tICcuL2Vudmlyb25tZW50LWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXV0aE1vZGFsQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZXhwb3J0czogW10sXG59KVxuZXhwb3J0IGNsYXNzIEp3dEF1dGhNb2R1bGUgeyBcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBFbnZpcm9ubWVudENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Snd0QXV0aE1vZHVsZT57XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBKd3RBdXRoTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIGF1dGhIdHRwSW50ZXJjZXB0b3JQcm92aWRlcixcbiAgICAgICAgQXV0aEludGVyY2VwdG9yU2VydmljZSxcbiAgICAgICAgQXV0aE1hbmFnZXJTZXJ2aWNlLFxuICAgICAgICBKd3RBdXRoU2VydmljZSxcbiAgICAgICAgQXV0aERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIEp3dEhlbHBlclNlcnZpY2UsXG4gICAgICAgIEF1dGhNYW5hZ2VyR3VhcmQsXG4gICAgICAgIEF1dGhTZXJ2aWNlLFxuICAgICAgICBVc2VyU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEVudmlyb25tZW50Q29uZmlnU2VydmljZSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9XG4gICAgICBdLFxuICAgIH1cbiAgfVxufVxuIl19