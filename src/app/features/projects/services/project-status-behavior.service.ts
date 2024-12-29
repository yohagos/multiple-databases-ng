import { inject, Injectable } from '@angular/core';
import { ProjectStatusApisService } from '../../../services/services';
import { BehaviorSubject } from 'rxjs';
import { ProjectStatus } from '../../../services/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusBehaviorService {
  private _projectStatusApiService = inject(ProjectStatusApisService)

  private _projectStatusSubject = new BehaviorSubject<ProjectStatus[]>([])
  projectStatus$ = this._projectStatusSubject.asObservable()


  loadProjectStatus() {
    this._projectStatusApiService.getAvailableProjectStatus().subscribe({
      next: (data) => this._projectStatusSubject.next(data)
    })
  }

  getProjectStatus() {
    this.loadProjectStatus()
    return this.projectStatus$
  }
}
