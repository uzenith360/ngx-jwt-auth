import { TestBed } from '@angular/core/testing';
import EnvironmentConfigService from './environment-config.service';

import { JwtAuthService } from './jwt-auth.service';

describe('JwtAuthService', () => {
  beforeEach(
    () => TestBed.configureTestingModule(
      {
        providers: [{ provide: EnvironmentConfigService, useValue: {} }]
      }
    )
  );

  it('should be created', () => {
    const service: JwtAuthService = TestBed.inject(JwtAuthService);
    expect(service).toBeTruthy();
  });
});
