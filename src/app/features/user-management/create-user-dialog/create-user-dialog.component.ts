import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserDto } from '../../../services/models';
import { FormbuilderService } from '../../../shared/services/formbuilder.service';
import { MatInputModule } from '@angular/material/input';
import { FormatingDisplayableTextsPipe } from '../../../core/pipes/formating-displayable-texts.pipe';
import { UserBehaviorService } from '../services/user-behavior.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,

    FormatingDisplayableTextsPipe,
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {
  private _userBehaviorService = inject(UserBehaviorService)
  private _formBuilderService = inject(FormbuilderService)
  createUser: CreateUserDto = {
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  }

  createUserForm: FormGroup = this._formBuilderService.createFormGroup(this.createUser)

  hidePassword = true

  constructor(
    private _dialogRef: MatDialogRef<CreateUserDialogComponent>
  ) {}

  getInputType(key: string) {
    const numberFields = ['age'];
    const emailFields = ['email'];
    const passwordFields = ['password'];

    if (numberFields.includes(key)) return 'number';
    if (emailFields.includes(key)) return 'email';
    if (passwordFields.includes(key)) {
      return this.hidePassword ? 'password' : 'text';
    }

    return 'text';
  }

  submitCreateUser() {
    const data = this.createUserForm.value;
    this._userBehaviorService.createNewUser(data)
    this.clearCreateUserForm()
    this._userBehaviorService.loadSubjectUserRepresentation()
    this._dialogRef.close()
  }

  clearCreateUserForm() {
    this.createUserForm.reset()
    this._dialogRef.close()
  }

}
