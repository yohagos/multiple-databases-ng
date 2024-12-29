import { TestBed } from '@angular/core/testing';

import { ProjectStatusBehaviorService } from './project-status-behavior.service';

describe('ProjectStatusBehaviorService', () => {
  let service: ProjectStatusBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectStatusBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
