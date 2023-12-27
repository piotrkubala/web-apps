import { TestBed } from '@angular/core/testing';

import { TripAccountingService } from './trip-accounting.service';

describe('TripAccountingService', () => {
  let service: TripAccountingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripAccountingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
