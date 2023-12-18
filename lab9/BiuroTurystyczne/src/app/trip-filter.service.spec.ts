import { TestBed } from '@angular/core/testing';

import { TripFilterService } from './trip-filter.service';

describe('TripFilterService', () => {
  let service: TripFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
