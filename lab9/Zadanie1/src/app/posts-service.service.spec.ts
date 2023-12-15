import { TestBed } from '@angular/core/testing';

import { PostsServiceService } from './posts-service.service';

describe('PostsServiceService', () => {
  let service: PostsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
