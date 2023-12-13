import { TestBed } from '@angular/core/testing';

import { ObituaryService } from './obituary.service';

describe('ObituaryService', () => {
  let service: ObituaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObituaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
