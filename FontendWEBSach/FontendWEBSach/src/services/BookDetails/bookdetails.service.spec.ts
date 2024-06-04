import { TestBed } from '@angular/core/testing';

import { BookDetailsService } from './bookdetails.service';

describe('BookDetailsService', () => {
  let service: BookDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
