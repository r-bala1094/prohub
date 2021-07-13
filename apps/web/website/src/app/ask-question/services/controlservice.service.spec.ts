import { TestBed } from '@angular/core/testing';

import { ControlserviceService } from './controlservice.service';

describe('ControlserviceService', () => {
  let service: ControlserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
