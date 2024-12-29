import { inject, Injectable } from '@angular/core';
import { CommentApisService } from '../../../services/services';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CommentRequest, CommentResponse } from '../../../services/models';

@Injectable({
  providedIn: 'root'
})
export class CommentBehaviorService {
  private _commentApiService = inject(CommentApisService)

  private _commentsSubject = new BehaviorSubject<CommentResponse[]>([])
  public comments$ = this._commentsSubject.asObservable()

  private loadComments(
    ticketId: string
  ) {
    this._commentApiService.getCommentsByTicketId({
      ticketId: ticketId
    }).subscribe({
      next: (data) => {
        this._commentsSubject.next(data)
      }
    })
  }

  getCommentsByTicketId(
    ticketId: string
  ) {
    this.loadComments(ticketId)
    return this.comments$
  }

  createNewComment(ticketId: string, req: CommentRequest) {
    if (req && req.content && req.ticketId) {
      this._commentApiService.createCommentForTicket({
        body: req
      }).pipe(
        switchMap(async () => this.loadComments(ticketId))
      ).subscribe()
    }

  }
}
