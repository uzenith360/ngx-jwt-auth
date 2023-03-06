import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { EnvironmentConfigService } from './environment-config.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      providers: [
        { provide: HttpClient, useValue: {} },
        { provide: EnvironmentConfigService, useValue: {} }
      ]
    }
  ));

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });
});
