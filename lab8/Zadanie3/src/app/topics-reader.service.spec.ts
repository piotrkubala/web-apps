import { TestBed } from '@angular/core/testing';

import { TopicsReaderService } from './topics-reader.service';

describe('TopicsReaderService', () => {
  let service: TopicsReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicsReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
