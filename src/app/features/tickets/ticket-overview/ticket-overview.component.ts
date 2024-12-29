import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketBehaviorService } from '../service/ticket-behavior.service';
import { Observable, of } from 'rxjs';
import { CommentRequest, CommentResponse, TicketResponse } from '../../../services/models';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { UserBehaviorService } from '../../user-management/services/user-behavior.service';
import { UserAdapterModel } from '../../../core/adapters/user.model';
import { FormatdateService } from '../../../shared/services/formatdate.service';
import { CommentBehaviorService } from '../service/comment-behavior.service';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from "ngx-markdown";
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-ticket-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,

    MarkdownComponent,
  ],
  templateUrl: './ticket-overview.component.html',
  styleUrl: './ticket-overview.component.scss'
})
export class TicketOverviewComponent implements OnInit, OnDestroy {
  private _router = inject(Router)
  private _ticketBehaviorService = inject(TicketBehaviorService)
  ticket$: Observable<TicketResponse | undefined> = this._ticketBehaviorService.getCurrentTicket()
  private _userBehaviorService = inject(UserBehaviorService)
  createdByUser$: Observable<UserAdapterModel | null> = of()
  private _commentBehaviorService = inject(CommentBehaviorService)
  comments$: Observable<CommentResponse[]> = of()

  formatingDateService = inject(FormatdateService)

  markdown = ``
  ticketId = ''
  writingComment = false

  ngOnInit(): void {
      this.ticket$.subscribe(data => {
        if (data && data.createdBy) {
          this._userBehaviorService.getUserById(data.createdBy)
          this.createdByUser$ = this._userBehaviorService.getCurrentUser()
        }
        if (data && data.id) {
          this.ticketId = data.id
          this.comments$ = this._commentBehaviorService.getCommentsByTicketId(data.id)
        }
      })
  }

  prepareData() {
    const comment = this.markdown
    let request: CommentRequest = {
      ticketId: this.ticketId,
      content: comment
    }
    return request
  }

  createTicket() {
    const request = this.prepareData()
    this._commentBehaviorService.createNewComment(this.ticketId, request)
    this.writingComment = false
    this.markdown = ``
  }

  deleteTicket(ticketId: string) {
    this._ticketBehaviorService.deleteTicketById(ticketId)
    this._router.navigate(['/tickets'])
  }

  ngOnDestroy(): void {
    this.markdown = ``
    this.writingComment = false
      this._ticketBehaviorService.setCurrentTicket(undefined)
  }
}
