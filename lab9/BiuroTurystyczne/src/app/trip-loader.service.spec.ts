import { TestBed } from '@angular/core/testing';

import { TripLoaderService } from './trip-loader.service';

describe('TripLoaderService', () => {
  let service: TripLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
