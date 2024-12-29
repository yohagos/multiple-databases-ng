import { TestBed } from '@angular/core/testing';

import { TicketStatusBehaviorService } from './ticket-status-behavior.service';

describe('TicketStatusBehaviorService', () => {
  let service: TicketStatusBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketStatusBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
