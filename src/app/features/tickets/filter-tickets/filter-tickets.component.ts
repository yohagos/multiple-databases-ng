import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { TicketBehaviorService } from '../service/ticket-behavior.service';
import { PriorityLevelBehaviorService } from '../../shared/services/priority-level-behavior.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TicketStatusBehaviorService } from '../service/ticket-status-behavior.service';
import { TicketTypeBehaviorService } from '../service/ticket-type-behavior.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PriorityLevel, ProjectResponse, TicketStatus, TicketType } from '../../../services/models';
import { ProjectBehaviorService } from '../../projects/services/project-behavior.service';



@Component({
  selector: 'app-filter-tickets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './filter-tickets.component.html',
  styleUrl: './filter-tickets.component.scss'
})
export class FilterTicketsComponent implements OnInit {
  private _ticketBehaviorService = inject(TicketBehaviorService)

  private _projectBehaviorService = inject(ProjectBehaviorService)
  projects$ = this._projectBehaviorService.getProjects()

  private _priorityLevelBehaviorService = inject(PriorityLevelBehaviorService)
  priorityLevels$ = this._priorityLevelBehaviorService.getPriorityLevels()

  private _ticketStatusBehaviorService = inject(TicketStatusBehaviorService)
  ticketStatus$ = this._ticketStatusBehaviorService.ticketStatus$

  private _ticketTypesBehaviorService = inject(TicketTypeBehaviorService)
  ticketTypes$ = this._ticketTypesBehaviorService.getTicketTypes()

  selectedLevel: PriorityLevel = {}
  selectedStatus: TicketStatus = {}
  selectedType: TicketType = {}
  selectedProject: ProjectResponse = {}

  objectKeys = Object.keys

  ngOnInit() {

  }


  removeFilter(obj: any) {
    if (this.matchesInterface<TicketStatus>(obj, ['id', 'status', 'statusColor'])) {
      this.selectedStatus = {}
    }
    if (this.matchesInterface<TicketType>(obj, ['id', 'ticketType'])) {
      this.selectedType = {}
    }
    if (this.matchesInterface<PriorityLevel>(obj, ['id', 'priorityLevel', 'priorityColor'])) {
      this.selectedLevel = {}
    }
    if (this.matchesInterface<ProjectResponse>(obj, ['id', 'projectName', 'customerName'])) {
      this.selectedProject = {}
    }

    console.log('status : ', this.selectedStatus)
    console.log('type : ', this.selectedType)
    console.log('level : ', this.selectedLevel)
    console.log('project : ', this.selectedProject)
    this.applyFilter()
  }

  matchesInterface<T>(obj: any, keys: (keyof T)[]): obj is T {
    return keys.every(key => key in obj)
  }

  applyFilter() {
    this._ticketBehaviorService.filterTickets(this.selectedProject, this.selectedLevel, this.selectedStatus, this.selectedType)
  }

  clearFilters() {
    this._ticketBehaviorService.clearFiltering()
    this.selectedProject = {}
    this.selectedLevel = {}
    this.selectedStatus = {}
    this.selectedType = {}
  }

}
