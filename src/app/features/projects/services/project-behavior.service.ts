import { inject, Injectable } from '@angular/core';
import { ProjectApisService } from '../../../services/services';
import { BehaviorSubject, switchMap } from 'rxjs';
import { PageResponseProjectResponse, Project, ProjectRequest, ProjectResponse, UserResponse } from '../../../services/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectBehaviorService {
  private _projectApiService = inject(ProjectApisService)

  private _projectBehaviorSubject = new BehaviorSubject<PageResponseProjectResponse>({})
  projects$ = this._projectBehaviorSubject.asObservable()

  private _assignedUsersByProjectIdSubject = new BehaviorSubject<UserResponse[]>([])
  assignedUsersByProjectId$ = this._assignedUsersByProjectIdSubject.asObservable()

  private _manageProjectBehavior = new BehaviorSubject<Project | null>(null)
  manageProject$ = this._manageProjectBehavior.asObservable()

  private _editModeBehavior = new BehaviorSubject<boolean>(false)
  editMode$ = this._editModeBehavior.asObservable()

  private loadProjects(
    page?: number,
    size?: number
  ) {
    this._projectApiService.getProjects({
      page: page,
      size: size
    }).subscribe({
      next: (res) => {
        this._projectBehaviorSubject.next(res)
      },
      error: (err) => console.log(err)
    })
  }

  getProjects(
    page?: number,
    size?: number
  ) {
    this.loadProjects(page, size)
    return this.projects$
  }

  selectProjectToManage(proj: ProjectResponse | Project | null) {
    this._manageProjectBehavior.next(proj)
  }

  getProjectToManage() {
    return this._manageProjectBehavior
  }

  createProject(project: ProjectRequest) {
    this._projectApiService.addProject({
      body: project
    }).pipe(
      switchMap(async () => {
        this.loadProjects()
        this.selectProjectToManage(null)
      })
    ).subscribe()
  }

  updateProject(project: ProjectRequest, id: string) {
    this._projectApiService.updateProject({
      body: project,
      projectId: id
    }).pipe(
      switchMap(async () => {
        this.loadProjects()
        this.selectProjectToManage(null)
      })
    ).subscribe()
  }

  deleteProjectById(id: string) {
    this._projectApiService.deleteProject({
      projectId: id
    }).pipe(
      switchMap(async () => {
        this.loadProjects()
        this.selectProjectToManage(null)
      })
    ).subscribe()
  }

  assignedUsersByProjectId(id: string) {
    this._projectApiService.getAssignedUsers({
      projectId: id
    }).subscribe({
      next: (data) => {
        this._assignedUsersByProjectIdSubject.next(data)
      }
    })
  }

  getAssignedUsers() {
    return this._assignedUsersByProjectIdSubject
  }

  setAssignedUsers(val: UserResponse[]) {
    this._assignedUsersByProjectIdSubject.next(val)
  }

  setEditMode(value: boolean) {
    this._editModeBehavior.next(value)
  }

  getEditMode() {
    return this.editMode$
  }
}
