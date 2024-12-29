import { Component, inject, OnDestroy } from '@angular/core';
import { DashboardBehaviourService } from './services/dashboard-behaviour.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Metrics, MetricsAnalytic } from '../../core/adapters/metrics.model';
import { DatabaseCountComponent } from './database-count/database-count.component';
import { DatabaseCacheComponent } from './database-cache/database-cache.component';
import { DashboardLoadingService } from './services/dashboard-loading.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,

    DatabaseCountComponent,
    DatabaseCacheComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  private _dashboardBehaviourService = inject(DashboardBehaviourService)
  private _loadingBehaviorService = inject(DashboardLoadingService)
  metrics$: Observable<Metrics[]> = new Observable()

  splitMetrics$: Observable<MetricsAnalytic> = of()

  loadingCount = true
  loadingCache = true
  loadingCacheChart = true

  objectKeys = Object.keys

  selectedValue = ''

  constructor() {
    this._dashboardBehaviourService.init()
    this.metrics$ = this._dashboardBehaviourService.getMetrics()
    this.metrics$.subscribe(data => {
      if (data) {
        this.splitMetrics$ = this._dashboardBehaviourService.getSplitMetrics()
      }
    })
    this._loadingBehaviorService.getLoadingCount().subscribe(data => {
      this.loadingCount = data

    })
    this._loadingBehaviorService.getLoadingCache().subscribe(data => {
      this.loadingCache = data
    })
    this._loadingBehaviorService.getLoadingCacheChart().subscribe(data => {
      this.loadingCacheChart = data
    })
  }

  selectedDatabase() {
    this._dashboardBehaviourService.setDatabaseSelected(this.selectedValue)
  }

  trackByFn(index: number, item: any) {
    return index
  }

  cancelDatabaseFilter() {
    this.selectedValue = ''
    this._dashboardBehaviourService.setDatabaseSelected('')
  }

  ngOnDestroy() {
    this._dashboardBehaviourService.disconnect()
  }
}
