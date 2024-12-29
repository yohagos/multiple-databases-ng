import { TestBed } from '@angular/core/testing';

import { DashboardBehaviourService } from './dashboard-behaviour.service';

describe('DashboardBehaviourService', () => {
  let service: DashboardBehaviourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardBehaviourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
