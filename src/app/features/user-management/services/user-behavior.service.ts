import { inject, Injectable } from '@angular/core';
import { UserApiService } from '../../../services/services';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CreateUserDto, UserRepresentation } from '../../../services/models';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { UserAdapterModel } from '../../../core/adapters/user.model';
import { ConfirmService } from '../../../shared/confirm-dialog/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class UserBehaviorService {
  private _userApiService = inject(UserApiService)
  private _snackbarService = inject(SnackbarService)
  private _confirmService = inject(ConfirmService)

  private _userBehaviorSubject: BehaviorSubject<UserRepresentation[]> = new BehaviorSubject<UserRepresentation[]>([]);
  userBehavior$ = this._userBehaviorSubject.asObservable()

  private _currentUserBehaviorSubject = new BehaviorSubject<UserAdapterModel | null>(null);
  currentUserBehavior$ = this._currentUserBehaviorSubject.asObservable()

  loadSubjectUserRepresentation() {
    this._userApiService.getAvailableUsers().subscribe({
      next: (users) => {
        this._userBehaviorSubject.next(users)
      },
      error: (error) => {
        this._snackbarService.error(error.message)
      }
    })
  }

  getUserRepresentation() {
    this.loadSubjectUserRepresentation()
    return this.userBehavior$
  }

  getUserById(id: string) {
    this._userApiService.getUserById({
      userId: id
    }).subscribe((data: UserAdapterModel) => {
      data.roles = data.roles?.filter(str => str !== str.toLowerCase())
      this._currentUserBehaviorSubject.next(data as UserAdapterModel)
    })
  }

  createNewUser(user: CreateUserDto) {
    this._userApiService.createUser({
      body: user
    }).pipe(
      switchMap(async () => this.loadSubjectUserRepresentation()),
    ).subscribe({
      next: () => {
      },
      error: (error) => {
        this._snackbarService.error(error.message)
      }
    })
  }

  getCurrentUser() {
    return this.currentUserBehavior$
  }

  deleteUserById(userId: string) {
    this._confirmService.confirm().subscribe((result) => {
      if (result && userId) {
        this._userApiService.removeUserById({
          userId: userId
        }).pipe(
          switchMap(async () => this.loadSubjectUserRepresentation()),
        ).subscribe({
          next: () => {
            this._currentUserBehaviorSubject.next(null)
          }
        })
      }
    })
  }
}
