import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EnvironmentConfigService } from './environment-config.service';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(
    () => TestBed.configureTestingModule(
      {
        providers: [
          { provide: HttpClient, useValue: {} },
          { provide: EnvironmentConfigService, useValue: {} }
        ]
      }
    )
  );

  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });
});
