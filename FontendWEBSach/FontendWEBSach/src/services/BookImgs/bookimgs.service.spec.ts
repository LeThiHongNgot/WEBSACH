import { TestBed } from '@angular/core/testing';

import { BookImgsService } from './bookimgs.service';

describe('BookImgsService', () => {
  let service: BookImgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookImgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
