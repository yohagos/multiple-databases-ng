import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackbar = inject(MatSnackBar)

  successful(
    message: string,
    action: string,
    duration?: number
  ) {
    this._snackbar.open(
      message,
      action,
      {
        duration: duration || 30000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      }
    )
  }

  error(message: string) {
    this._snackbar.open(message, 'close', {
      duration: 30000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    })
  }
}
