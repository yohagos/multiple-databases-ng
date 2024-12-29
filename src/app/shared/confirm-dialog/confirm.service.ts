import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private _matDialog = inject(MatDialog)

  confirm() {
    const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
      width: '300px',
    })
    return dialogRef.afterClosed()
  }
}
