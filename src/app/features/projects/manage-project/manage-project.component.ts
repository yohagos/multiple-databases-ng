import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from '@angular/material/input';
import { ProjectBehaviorService } from '../services/project-behavior.service';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { PriorityLevel, Project, ProjectRequest, ProjectStatus } from '../../../services/models';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PriorityLevelBehaviorService } from '../../shared/services/priority-level-behavior.service';
import { ProjectStatusBehaviorService } from '../services/project-status-behavior.service';
import { ConfirmService } from '../../../shared/confirm-dialog/confirm.service';
import { MarkdownComponent } from 'ngx-markdown';
import { GeminiAiService } from '../../../core/services/gemini/gemini-ai.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTicketDialogComponent } from '../../tickets/create-ticket-dialog/create-ticket-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,

    MarkdownComponent,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-En'
    },
    provideNativeDateAdapter()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export class ManageProjectComponent implements OnInit {
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _geminiAiService = inject(GeminiAiService)
  private _dialogRef = inject(MatDialog)
  private _projectBehaviorService = inject(ProjectBehaviorService)
  project$ = this._projectBehaviorService.getProjectToManage()
  assinedUsers$ = this._projectBehaviorService.getAssignedUsers()
  private _priorityLevelBehaviorService = inject(PriorityLevelBehaviorService)
  priorityLevels$ = this._priorityLevelBehaviorService.getPriorityLevels()

  private _projectStatusBehaviorService = inject(ProjectStatusBehaviorService)
  projectStatus$ = this._projectStatusBehaviorService.getProjectStatus()

  private _confirmService = inject(ConfirmService)

  editMode = false
  projectId = ''

  markdownData = ``

  projectForm: FormGroup = this._fb.group({
    projectName: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    projectDescription: new FormControl('', Validators.required),
    projectStartDate: new FormControl<Date | null>(null, Validators.required),
    projectEndDate: new FormControl<Date | null>(null, Validators.required),
    priorityLevel: new FormControl<PriorityLevel | null>(null, Validators.required),
    projectStatus: new FormControl<ProjectStatus | null>(null, Validators.required),
  })

  constructor() {
    this.projectForm.get('projectDescription')?.valueChanges.subscribe((data) => {
      if (data) {
        this.markdownData = data
      }
    })
  }

  ngOnInit(): void {
    this.project$.subscribe(data => {
      if (data && data.id) {
        this.patchFormValues(data)
        this.projectId = data.id
        this._projectBehaviorService.assignedUsersByProjectId(this.projectId)
      } else {
        this.projectForm.reset()
        this.editMode = false
        this.projectId = ''
      }
    })

    this._projectBehaviorService.getEditMode().subscribe(data => {
      this.editMode = data
    })
  }

  createTicketButton() {
    this._dialogRef.open(CreateTicketDialogComponent, {
      width: '700px',
      height: 'auto',
      minHeight: 'calc(60vh - 90px)'
    })
    this._dialogRef.afterAllClosed.subscribe(() => this._router.navigate(['/tickets']))
  }

  patchFormValues(proj: Project) {
    this.projectForm.patchValue(proj)
    this.editMode = true
  }

  compareFn(option: any, value: any) {
    return option && value ? option.id === value.id : option === value
  }

  prepareData() {
    return this.projectForm.value as ProjectRequest
  }

  cancel() {
    this.projectForm.reset()
    this._projectBehaviorService.selectProjectToManage(null)
    this.editMode = false
    this.projectId = ''
    this.markdownData = ``
  }

  submit() {
    const preparedData = this.prepareData()
    if (this.editMode && this.projectId.length > 0) {
      this._projectBehaviorService.updateProject(preparedData, this.projectId)
      this.projectForm.reset()
    } else {
      this._projectBehaviorService.createProject(preparedData)
      this.projectForm.reset()
    }
  }

  async askGemini() {
    const projectName = this.projectForm.get('projectName')?.value
    const customerName = this.projectForm.get('customerName')?.value
    const projectDescription = this.projectForm.get('projectDescription')?.value
    console.log(projectName, projectDescription, customerName)
    if (projectName && customerName && projectDescription) {
      const result = await this._geminiAiService.helpWithProjectDescription(projectName, customerName, projectDescription)
      console.log(result)
      this.projectForm.get('projectDescription')?.setValue(result)
    }
  }

  deleteProject(id: string | undefined) {
    if (id) {
      this._confirmService.confirm().subscribe(response => {
        if (response) {
          this._projectBehaviorService.deleteProjectById(id)
        }
      })
    }
  }
}
