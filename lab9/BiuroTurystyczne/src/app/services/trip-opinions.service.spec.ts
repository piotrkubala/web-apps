import { TestBed } from '@angular/core/testing';

import { TripOpinionsService } from './trip-opinions.service';

describe('TripOpinionsService', () => {
  let service: TripOpinionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripOpinionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
