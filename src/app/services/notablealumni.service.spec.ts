import { TestBed } from '@angular/core/testing';

import { NotablealumniService } from './notablealumni.service';

describe('NotablealumniService', () => {
  let service: NotablealumniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotablealumniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
