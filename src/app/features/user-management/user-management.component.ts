import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from "@angular/material/tabs";
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ComponentType } from '@angular/cdk/portal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserBehaviorService } from './services/user-behavior.service';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { UserRepresentation } from '../../services/models';
import { UserOverviewComponent } from './user-overview/user-overview.component';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    UserOverviewComponent,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  private _router = inject(Router)
  private _matDialog = inject(MatDialog)
  private _userBehaviorService = inject(UserBehaviorService)
  users$ = this._userBehaviorService.getUserRepresentation()

  selectUser(
    user: UserRepresentation
  ) {
    if (user && user.id) {
      this._userBehaviorService.getUserById(user.id)
    }
  }

  createUserDialog() {
    const dialogRef = this._matDialog.open(CreateUserDialogComponent, {
      width: '70%',
    })
    dialogRef.afterClosed().subscribe()
  }

  openTickets() {
    this._router.navigate(['/tickets']);
  }
}
