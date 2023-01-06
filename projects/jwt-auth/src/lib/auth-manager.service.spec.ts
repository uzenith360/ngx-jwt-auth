import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { AuthManagerService } from './auth-manager.service';
import EnvironmentConfigService from './environment-config.service';

describe('AuthManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: EnvironmentConfigService, useValue: {} }
      ],
    }
  ));

  it('should be created', () => {
    const service: AuthManagerService = TestBed.inject(AuthManagerService);
    expect(service).toBeTruthy();
  });
});
