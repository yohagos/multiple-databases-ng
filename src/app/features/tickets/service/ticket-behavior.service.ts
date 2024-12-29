import { inject, Injectable } from '@angular/core';
import { TicketApisService } from '../../../services/services';
import { BehaviorSubject, switchMap } from 'rxjs';
import { PageResponseTicketResponse, PriorityLevel, ProjectResponse, TicketRequest, TicketResponse, TicketStatus, TicketType } from '../../../services/models';


@Injectable({
  providedIn: 'root'
})
export class TicketBehaviorService {
  private _ticketApiService = inject(TicketApisService)

  private _ticketSubject = new BehaviorSubject<PageResponseTicketResponse>({})
  public ticket$ = this._ticketSubject.asObservable()

  private _filteredTicketSubject = new BehaviorSubject<TicketResponse[]>([])
  public filteredTicket$ = this._filteredTicketSubject.asObservable()

  private _currentTicketSubject = new BehaviorSubject<TicketResponse | undefined>({})
  currentTicket$ = this._currentTicketSubject.asObservable()

  private loadTickets(
    page?: number,
    size?: number
  ) {
    this._ticketApiService.getTickets({
      page: page,
      size: size
    }).subscribe({
      next: (data) => {
        this._ticketSubject.next(data)
        this._filteredTicketSubject.next(data.content || [])
      }
    })
  }

  filterTickets(
    project?: ProjectResponse,
    level?: PriorityLevel,
    status?: TicketStatus,
    type?: TicketType
  ) {
    const tickets = this._filteredTicketSubject.value || this._ticketSubject.value
    const filtered = tickets.filter(ticket => {
      const matchesProject = project ? ticket.project?.id === project.id : false
      const matchesPriority = level ? ticket.priorityLevel?.id === level.id : false
      const matchesStatus = status ? ticket.ticketStatus === status : false
      const matchesType = type ? ticket.ticketType === type : false

      return matchesProject || matchesPriority || matchesStatus || matchesType
    })
    this._filteredTicketSubject.next(filtered)
  }

  clearFiltering() {
    const tickets = this._ticketSubject.value
    this._filteredTicketSubject.next(tickets.content || [])
  }

  getTickets(
    page?: number,
    size?: number
  ) {
    this.loadTickets(page, size)
    return this.ticket$
  }

  getCurrentTicket() {
    return this.currentTicket$
  }

  setCurrentTicket(ticket: TicketResponse | undefined) {
    this._currentTicketSubject.next(ticket)
  }

  createNewTicket(request: TicketRequest) {
    this._ticketApiService.createTicket({
      body: request
    }).pipe(
      switchMap(async () => this.loadTickets())
    ).subscribe()
  }

  deleteTicketById(ticketId: string) {
    this._ticketApiService.removeTicketById({
      ticketId: ticketId
    }).pipe(
      switchMap(async () => this.loadTickets())
    ).subscribe()
  }
}
