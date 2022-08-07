import { TestBed } from '@angular/core/testing';

import { CalculatingService } from './calculating.service';

describe('CalculatingService', () => {
  let service: CalculatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
