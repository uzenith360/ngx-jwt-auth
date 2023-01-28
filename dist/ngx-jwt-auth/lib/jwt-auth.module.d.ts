import { ModuleWithProviders } from '@angular/core';
import { EnvironmentConfig } from './environment-config.interface';
import * as i0 from "@angular/core";
import * as i1 from "./auth-modal/auth-modal.component";
import * as i2 from "@angular/common";
import * as i3 from "@angular/common/http";
import * as i4 from "@angular/material/dialog";
import * as i5 from "@angular/material/core";
import * as i6 from "@angular/platform-browser/animations";
import * as i7 from "@angular/forms";
import * as i8 from "@angular/material/form-field";
import * as i9 from "@angular/material/input";
export declare class JwtAuthModule {
    static forRoot(config: EnvironmentConfig): ModuleWithProviders<JwtAuthModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JwtAuthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<JwtAuthModule, [typeof i1.AuthModalComponent], [typeof i2.CommonModule, typeof i3.HttpClientModule, typeof i4.MatDialogModule, typeof i5.MatRippleModule, typeof i6.BrowserAnimationsModule, typeof i7.ReactiveFormsModule, typeof i8.MatFormFieldModule, typeof i9.MatInputModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<JwtAuthModule>;
}
