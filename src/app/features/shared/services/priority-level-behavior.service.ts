import { inject, Injectable } from '@angular/core';
import { PriorityLevelApisService } from '../../../services/services';
import { BehaviorSubject } from 'rxjs';
import { PriorityLevel } from '../../../services/models';

@Injectable({
  providedIn: 'root'
})
export class PriorityLevelBehaviorService {
  private _priorityLevelApiService = inject(PriorityLevelApisService)

  private _priorityLevelSubject = new BehaviorSubject<PriorityLevel[]>([])
  priorityLevel$ = this._priorityLevelSubject.asObservable()


  private loadPriorityLevels() {
    this._priorityLevelApiService.getAvailablePriorityLevels().subscribe({
      next: (data) => this._priorityLevelSubject.next(data)
    })
  }

  getPriorityLevels() {
    this.loadPriorityLevels()
    return this.priorityLevel$
  }
}
