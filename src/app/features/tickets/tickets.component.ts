import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TicketBehaviorService } from './service/ticket-behavior.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TicketResponse } from '../../services/models';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { FilterTicketsComponent } from './filter-tickets/filter-tickets.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTicketDialogComponent } from './create-ticket-dialog/create-ticket-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormatdateService } from '../../shared/services/formatdate.service';
import { ProjectBehaviorService } from '../projects/services/project-behavior.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,

    FilterTicketsComponent
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  private _dialogRef = inject(MatDialog)
  private _router = inject(Router)

  private _ticketBehaviorService = inject(TicketBehaviorService)
  tickets$ = this._ticketBehaviorService.getTickets()

  filteredTickets$ = this._ticketBehaviorService.filteredTicket$

  formatingDateService = inject(FormatdateService)

  showingDetail = false

  constructor() {
    this._router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
          if (ev.urlAfterRedirects.match('/tickets')) {
            this.showingDetail = false
          }
      }
    })
  }

  createTicketButton() {
    this._dialogRef.open(CreateTicketDialogComponent, {
      width: '700px',
      height: 'auto',
      minHeight: 'calc(60vh - 90px)'
    })
  }

  openTicketOverview(
    ticket: TicketResponse
  ) {
    if (ticket.id) {
      this._ticketBehaviorService.setCurrentTicket(ticket)
      this._router.navigate(['tickets/ticket',  ticket.id]).then(success => {
        if (success) {
          this.showingDetail = true
        }
      })
    }
  }

  checkTicketRoute() {
    return this._router.url === '/tickets' ? true : false
  }
}
