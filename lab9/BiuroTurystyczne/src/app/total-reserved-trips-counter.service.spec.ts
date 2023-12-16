import { TestBed } from '@angular/core/testing';

import { TotalReservedTripsCounterService } from './total-reserved-trips-counter.service';

describe('TotalReservedTripsCounterService', () => {
  let service: TotalReservedTripsCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalReservedTripsCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
