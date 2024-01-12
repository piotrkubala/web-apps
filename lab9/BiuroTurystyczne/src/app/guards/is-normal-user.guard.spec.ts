import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isNormalUserGuard } from './is-normal-user.guard';

describe('isNormalUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNormalUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
