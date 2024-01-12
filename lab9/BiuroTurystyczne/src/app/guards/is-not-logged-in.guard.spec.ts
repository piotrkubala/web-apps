import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isNotLoggedInGuard } from './is-not-logged-in.guard';

describe('isNotLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
