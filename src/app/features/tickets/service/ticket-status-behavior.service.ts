import { inject, Injectable } from '@angular/core';
import { TicketStatusApisService } from '../../../services/services';
import { BehaviorSubject } from 'rxjs';
import { TicketStatus } from '../../../services/models';

@Injectable({
  providedIn: 'root'
})
export class TicketStatusBehaviorService {
  private _ticketStatusApiService = inject(TicketStatusApisService)

  ticketStatus$ = this._ticketStatusApiService.getTicketStatus()

}
