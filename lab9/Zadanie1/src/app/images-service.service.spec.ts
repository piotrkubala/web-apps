import { TestBed } from '@angular/core/testing';

import { ImagesServiceService } from './images-service.service';

describe('ImagesServiceService', () => {
  let service: ImagesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
