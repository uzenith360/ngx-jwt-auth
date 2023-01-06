import { TestBed } from '@angular/core/testing';
import EnvironmentConfigService from './environment-config.service';

import { JwtManagerService } from './jwt-manager.service';

describe('JwtManagerService', () => {
  beforeEach(
    () => TestBed.configureTestingModule(
      {
        providers: [{ provide: EnvironmentConfigService, useValue: {} }]
      }
    )
  );

  it('should be created', () => {
    const service: JwtManagerService = TestBed.inject(JwtManagerService);
    expect(service).toBeTruthy();
  });
});
