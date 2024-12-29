import { TestBed } from '@angular/core/testing';

import { GroupBehaviorService } from './group-behavior.service';

describe('GroupBehaviorService', () => {
  let service: GroupBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
