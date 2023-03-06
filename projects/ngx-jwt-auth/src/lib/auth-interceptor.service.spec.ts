import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { AuthInterceptorService } from './auth-interceptor.service';
import { EnvironmentConfigService } from './environment-config.service';

describe('AuthInterceptorService', () => {
  beforeEach(
    () => TestBed.configureTestingModule(
      {
        providers: [
          { provide: HttpClient, useValue: {} },
          { provide: MatDialog, useValue: {} },
          { provide: EnvironmentConfigService, useValue: {} }
        ]
      }
    )
  );

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.inject(AuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
