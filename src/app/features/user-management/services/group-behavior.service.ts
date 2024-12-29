import { inject, Injectable } from '@angular/core';
import { GroupApisService } from '../../../services/services';
import { BehaviorSubject, switchMap } from 'rxjs';
import { GroupRepresentation } from '../../../services/models';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { UserBehaviorService } from './user-behavior.service';

@Injectable({
  providedIn: 'root'
})
export class GroupBehaviorService {
  private _groupApiService = inject(GroupApisService)

  private _groupBehaviorSubject = new BehaviorSubject<GroupRepresentation[]>([])
  groups$ = this._groupBehaviorSubject.asObservable()

  private _snackbarService = inject(SnackbarService)
  private _userBehaviorService = inject(UserBehaviorService)

  loadAvailableGroups() {
    this._groupApiService.getGroups().subscribe({
      next: (groups) => {
        this._groupBehaviorSubject.next(groups)
      }
    })
  }

  getAvailableGroups() {
    this.loadAvailableGroups()
    return this.groups$
  }

  leaveGroup(userId: string, groupId: string) {
    this._groupApiService.leaveGroupById({
      userId: userId,
      groupId: groupId
    }).subscribe({
      next: () => {
        console.log('successfully left the group')
      },
      error: (error) => {
        this._snackbarService.error(error)
      }
    })
  }

  assignUserToGroup(userId: string, groupId: string) {
    return this._groupApiService.assignGroupById({
      userId: userId,
      groupId: groupId
    }).pipe(
      switchMap(async () => this._userBehaviorService.getUserById(userId)),
    )
  }

}
