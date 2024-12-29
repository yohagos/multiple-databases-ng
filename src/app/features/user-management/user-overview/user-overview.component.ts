import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { UserBehaviorService } from '../services/user-behavior.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { FormatingDisplayableTextsPipe } from '../../../core/pipes/formating-displayable-texts.pipe';
import { UserAdapterModel, UserGroupsAdapterModel } from '../../../core/adapters/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { UtilsService } from '../../../shared/services/utils.service';
import { GroupBehaviorService } from '../services/group-behavior.service';
import { GroupRepresentation } from '../../../services/models';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatListModule,

    FormatingDisplayableTextsPipe,
    AsyncPipe
  ],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss'
})
export class UserOverviewComponent implements OnInit {
  private _fb = inject(FormBuilder)
  private _utilsService = inject(UtilsService)
  private _userBehaviorService = inject(UserBehaviorService)
  currentUser$ = this._userBehaviorService.getCurrentUser()

  addGroupControl = new FormControl<string | UserGroupsAdapterModel>('')

  private _groupBehaviorService = inject(GroupBehaviorService)
  groupOptions: GroupRepresentation[] = []
  filteredGroupOptions = new Observable<GroupRepresentation[]>()


  userModel: UserAdapterModel = {}

  userForm!: FormGroup

  editModeUser = false
  editModeGroups = false
  editModeRoles = false

  activateAutocomplete = false

  step = signal(0)

  constructor() {
    this.reloadData()
  }

  reloadData() {
    this.currentUser$.subscribe(data => {
      if (data) {
        this.userModel = data
        this.userForm = this._fb.group({
          firstName: [data.firstName || ''],
          lastName: [data.lastName || ''],
          username: [data.username || ''],
          groups: this._fb.array(
            data.groups?.map(group =>
              this._fb.group({
                id: [group.id || ''],
                name: [this._utilsService.formatStrings(group.name)],
                path: [group.path || ''],
                parentId: [group.parentId || ''],
                realmRoles: [group.realmRoles || '']
              })
            )  || []
          ),
          roles: [data.roles?.join(', ') || '']
        })
      }
    })
  }

  ngOnInit() {
    this._groupBehaviorService.getAvailableGroups().subscribe((data: GroupRepresentation[]) => {
      this.groupOptions = data
    })

    this.filteredGroupOptions = this.addGroupControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name
        return name ? this._filter(name as string) : this.groupOptions.slice()
      })
    )
  }

  setStep(index: number) {
    this.step.set(index)
  }

  nextStep() {
    this.step.update(i => i + 1)
  }

  prevStep() {
    this.step.update(i => i - 1)
  }

  get groupsArray() {
    return this.userForm.get('groups') as FormArray
  }

  editUserInfo() {
    this.editModeUser = true

  }

  editGroupInfos() {
    this.editModeGroups = true
  }

  saveGroupEdit() {
    this.editModeGroups = false
  }

  assignGroup() {
    const group = this.addGroupControl.value as UserGroupsAdapterModel
    if (this.userModel.id && group.id) {
      this._groupBehaviorService.assignUserToGroup(
        this.userModel.id,
        group.id
      ).subscribe({
        next: () => {
          this.addGroupControl.setValue('')
          this.editModeGroups = false
          this.reloadData()
        },
        error: (error) => {}
      })

    }
  }

  leaveGroup(group: UserGroupsAdapterModel) {
    if (this.userModel.id && group.id) {
      this._groupBehaviorService.leaveGroup(this.userModel.id, group.id)
    }
  }


  removeGroupFromArray(index: number) {
    const groups = this.userForm.get('groups') as FormArray
    if (groups && index > -1 && index < groups.length) {
      this.leaveGroup(groups.value[index])
      groups.removeAt(index)
    }
  }

  displayFn(group: GroupRepresentation): string {
    return group && group.name ? group.name : ''
  }

  private _filter(name: string): GroupRepresentation[] {
    const filterValue = name.toLowerCase()
    return this.groupOptions.filter(opt => opt.name?.toLowerCase().includes(filterValue))
  }

  cancelSelectedGroup() {
    this.addGroupControl.setValue('')
  }

  removeUserById() {
    if (this.userModel && this.userModel.id) {
      this._userBehaviorService.deleteUserById(this.userModel.id)
    }
  }
}
