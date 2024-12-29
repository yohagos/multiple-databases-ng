import { TestBed } from '@angular/core/testing';

import { MenuconfigService } from './menuconfig.service';

describe('MenuconfigService', () => {
  let service: MenuconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
