import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import EnvironmentConfigService from '../environment-config.service';

import { AuthModalComponent } from './auth-modal.component';

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;

  beforeEach(
    waitForAsync(
      () => {
        TestBed.configureTestingModule({
          declarations: [AuthModalComponent], imports: [MatFormFieldModule, ReactiveFormsModule, MatDialogModule, MatInputModule, BrowserAnimationsModule],
          providers: [
            { provide: HttpClient, useValue: {} },
            { provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} },
            { provide: UntypedFormBuilder, useValue: {} },
            { provide: EnvironmentConfigService, useValue: {} }
          ]
        }).compileComponents();
      }
    ),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
