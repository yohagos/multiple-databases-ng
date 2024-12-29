import { TestBed } from '@angular/core/testing';

import { PriorityLevelBehaviorService } from './priority-level-behavior.service';

describe('PriorityLevelBehaviorService', () => {
  let service: PriorityLevelBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriorityLevelBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
