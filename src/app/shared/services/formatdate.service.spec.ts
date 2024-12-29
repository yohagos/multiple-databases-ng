import { TestBed } from '@angular/core/testing';

import { FormatdateService } from './formatdate.service';

describe('FormatdateService', () => {
  let service: FormatdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
