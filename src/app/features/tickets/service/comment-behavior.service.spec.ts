import { TestBed } from '@angular/core/testing';

import { CommentBehaviorService } from './comment-behavior.service';

describe('CommentBehaviorService', () => {
  let service: CommentBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
