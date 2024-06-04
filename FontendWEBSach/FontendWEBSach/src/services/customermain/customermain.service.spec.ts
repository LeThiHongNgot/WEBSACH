import { TestBed } from '@angular/core/testing';

import { CustomermainService } from './customermain.service';

describe('CustomermainService', () => {
  let service: CustomermainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomermainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
