import { TestBed } from '@angular/core/testing';

import { MapLeafletsService } from './map-leaflets.service';

describe('MapLeafletsService', () => {
  let service: MapLeafletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapLeafletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
