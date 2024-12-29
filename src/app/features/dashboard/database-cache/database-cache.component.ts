import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardBehaviourService } from '../services/dashboard-behaviour.service';
import { catchError, Observable, of } from 'rxjs';
import { CacheMetricAnalytic, Metrics, MetricsAnalytic } from '../../../core/adapters/metrics.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AreachartComponent } from './areachart/areachart.component';
import { DashboardLoadingService } from '../services/dashboard-loading.service';

@Component({
  selector: 'app-database-cache',
  standalone: true,
  imports: [
    CommonModule,
    
    MatProgressSpinnerModule,
    AreachartComponent,
  ],
  templateUrl: './database-cache.component.html',
  styleUrl: './database-cache.component.scss',
})
export class DatabaseCacheComponent {
  private _dashboardBehaviorService = inject(DashboardBehaviourService);

  cacheMetric$: Observable<CacheMetricAnalytic> = this._dashboardBehaviorService.getCacheMetric()

  dataset: number[][] = []
  labels = ['Cache Hit Rate', 'Index Scans', 'Tuples Read From Index', 'Tuples Fetched By Index']
  dbKeys = []
  objectKeys = Object.keys

  constructor() {
    this.cacheMetric$.subscribe()
  }

}
