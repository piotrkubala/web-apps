import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isManagerGuard } from './is-manager.guard';

describe('isManagerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isManagerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
