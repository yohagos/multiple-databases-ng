import { TestBed } from '@angular/core/testing';

import { RoleBehaviorService } from './role-behavior.service';

describe('RoleBehaviorService', () => {
  let service: RoleBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
