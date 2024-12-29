import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TicketStatusBehaviorService } from '../service/ticket-status-behavior.service';
import { TicketTypeBehaviorService } from '../service/ticket-type-behavior.service';
import { PriorityLevelBehaviorService } from '../../shared/services/priority-level-behavior.service';
import { ProjectBehaviorService } from '../../projects/services/project-behavior.service';
import { PriorityLevel, Project, TicketRequest, TicketStatus } from '../../../services/models';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TicketBehaviorService } from '../service/ticket-behavior.service';
import { MarkdownComponent } from 'ngx-markdown';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { GeminiAiService } from '../../../core/services/gemini/gemini-ai.service';
import { FormatdateService } from '../../../shared/services/formatdate.service';

@Component({
  selector: 'app-create-ticket-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,

    MarkdownComponent
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './create-ticket-dialog.component.html',
  styleUrl: './create-ticket-dialog.component.scss'
})
export class CreateTicketDialogComponent {
  private _dialogRef = inject(MatDialogRef<CreateTicketDialogComponent>)
  private _ticketStatusBehaviorService = inject(TicketStatusBehaviorService)
  ticketStatus$ = this._ticketStatusBehaviorService.ticketStatus$

  private _ticketTypeBehaviorService = inject(TicketTypeBehaviorService)
  ticketTypes$ = this._ticketTypeBehaviorService.getTicketTypes()

  private _priorityLevelBehaviorService = inject(PriorityLevelBehaviorService)
  priorityLevels$ = this._priorityLevelBehaviorService.getPriorityLevels()

  private _projectBehaviorService = inject(ProjectBehaviorService)
  projects$ = this._projectBehaviorService.getProjects()

  private _ticketBehaviorService = inject(TicketBehaviorService)

  private _fb = inject(FormBuilder)

  markdownData = ``

  private _geminiAiService = inject(GeminiAiService)

  formatingDateService = inject(FormatdateService)

  createTicketForm = this._fb.group({
    ticketName: new FormControl('', Validators.required),
    ticketDescription: new FormControl('', Validators.required),
    ticketType: new FormControl('', Validators.required),
    ticketStatus: new FormControl<TicketStatus | undefined>(undefined, Validators.required),
    priorityLevel: new FormControl<PriorityLevel | undefined>(undefined, Validators.required),
    project: new FormControl<Project | undefined>(undefined, Validators.required),
    dueDate: new FormControl<Date | undefined>(undefined, Validators.required)
  })

  constructor() {
    this.createTicketForm.get('ticketDescription')?.valueChanges.subscribe((data) => {
      if (data) {
        this.markdownData = data
      }
    })
  }

  prepareData() {
    return this.createTicketForm.value as TicketRequest
  }

  async askGemini() {
    const ticketName = this.createTicketForm.get('ticketName')?.value
    const ticketDescription = this.createTicketForm.get('ticketDescription')?.value || ''
    const projectName = this.createTicketForm.get('project')?.value?.projectName
    const projectDescription = this.createTicketForm.get('project')?.value?.projectDescription
    for (let controlName in this.createTicketForm.controls) {
      const control = this.createTicketForm.get(controlName)
      if (control && !control.value) {
        control.pristine
      }
    }
    if (ticketName && projectDescription && projectName) {
      const result = await this._geminiAiService.helpWithTicketDescription(
        ticketDescription, ticketName, projectName, projectDescription
      )
      this.createTicketForm.get('ticketDescription')?.setValue(result)

    }
  }

  submitForm() {
    const ticketRequest = this.prepareData()

    this._ticketBehaviorService.createNewTicket(ticketRequest)
    this._dialogRef.close()
  }

  cancel() {
    this.markdownData = ``
    this.createTicketForm.reset()
  }

}
