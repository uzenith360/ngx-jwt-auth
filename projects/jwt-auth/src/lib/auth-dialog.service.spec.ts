import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { AuthDialogService } from './auth-dialog.service';

describe('AuthDialogService', () => {
  beforeEach(
    () => TestBed.configureTestingModule(
      {
        providers: [
          { provide: MatDialog, useValue: {} },
        ],
      }
    )
  );

  it('should be created', () => {
    const service: AuthDialogService = TestBed.inject(AuthDialogService);
    expect(service).toBeTruthy();
  });
});
