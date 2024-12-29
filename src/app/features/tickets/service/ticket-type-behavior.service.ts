import { inject, Injectable } from '@angular/core';
import { TicketTypesApisService } from '../../../services/services';
import { BehaviorSubject } from 'rxjs';
import { TicketType } from '../../../services/models';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeBehaviorService {
  private _ticketTypeApiService = inject(TicketTypesApisService)

  private _ticketTypeSubject = new BehaviorSubject<TicketType[]>([])
  ticketTypes$ = this._ticketTypeSubject.asObservable()

  private loadTicketTypes() {
    this._ticketTypeApiService.getTicketTypes().subscribe({
      next: (data) => {
        this._ticketTypeSubject.next(data)
      }
    })
  }

  getTicketTypes() {
    this.loadTicketTypes()
    return this.ticketTypes$
  }
}
