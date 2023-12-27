import { TestBed } from '@angular/core/testing';

import { ShoppingHistoryService } from './shopping-history.service';

describe('ShoppingHistoryService', () => {
  let service: ShoppingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
