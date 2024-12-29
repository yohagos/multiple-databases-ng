import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProjectBehaviorService } from './services/project-behavior.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { TextfilterPipe } from '../../core/pipes/textfilter.pipe';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { PriorityLevel, Project, ProjectResponse, ProjectStatus } from '../../services/models';
import { FormatdateService } from '../../shared/services/formatdate.service';
import { ProjectStatusBehaviorService } from './services/project-status-behavior.service';
import { PriorityLevelBehaviorService } from '../shared/services/priority-level-behavior.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatTooltipModule,
    MatStepperModule,

    //TextfilterPipe,
    ManageProjectComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  formatDateService = inject(FormatdateService)
  private _projectBehaviorService = inject(ProjectBehaviorService)
  projects$ = this._projectBehaviorService.getProjects()

  private _projectStatusBehaviorService = inject(ProjectStatusBehaviorService)
  projectStatus$ = this._projectStatusBehaviorService.getProjectStatus()

  private _priorityLevelBehaviorService = inject(PriorityLevelBehaviorService)
  priorityLevels$ = this._priorityLevelBehaviorService.getPriorityLevels()

  filter = ''

  informationOpened = false

  displayedColumnsStatus = ['status', 'color']
  dataSourceStatus: ProjectStatus[] = []

  displayedColumnsPriority = ['level', 'color']
  dataSourcePriority: PriorityLevel[] = []

  ngOnInit() {
    this.projectStatus$.subscribe(data => {
      this.dataSourceStatus = data
    })

    this.priorityLevels$.subscribe(data => {
      this.dataSourcePriority = data
    })
  }

  createNewProject() {
    const project: Project = {
      customerName: '',
      priorityLevel: undefined,
      projectDescription: '',
      projectEndDate: '',
      projectName: '',
      projectStartDate: '',
      projectStatus: undefined
    }
    this._projectBehaviorService.setEditMode(false)
    this._projectBehaviorService.selectProjectToManage(project)
  }

  selectProject(proj: ProjectResponse) {
    this._projectBehaviorService.selectProjectToManage(proj)
  }

  getStatusColor(proj: Project) {
    return `8px solid ${proj.projectStatus?.statusColor}`
  }

  getPriorityColor(proj: Project) {
    return `6px solid ${proj.priorityLevel?.priorityColor}`
  }

  openInformation() {
    this.informationOpened = !this.informationOpened
  }
}
