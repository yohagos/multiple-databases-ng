import { TestBed } from '@angular/core/testing';

import { TicketTypeBehaviorService } from './ticket-type-behavior.service';

describe('TicketTypeBehaviorService', () => {
  let service: TicketTypeBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketTypeBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
