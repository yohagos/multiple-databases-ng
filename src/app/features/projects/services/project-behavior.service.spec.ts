import { TestBed } from '@angular/core/testing';

import { ProjectBehaviorService } from './project-behavior.service';

describe('ProjectBehaviorService', () => {
  let service: ProjectBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
