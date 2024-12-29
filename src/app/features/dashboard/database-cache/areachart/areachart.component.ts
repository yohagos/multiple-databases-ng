import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardBehaviourService } from '../../services/dashboard-behaviour.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-areachart',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    MatProgressSpinnerModule,
  ],
  templateUrl: './areachart.component.html',
  styleUrl: './areachart.component.scss'
})
export class AreachartComponent {
  private _dashboardBehaviorService = inject(DashboardBehaviourService)
  private _cacheMetric$ = this._dashboardBehaviorService.getCacheMetric()
  @Input('labels') labels: string[] = []
  @Input('key') dbKey!: string

  areaChartLegend = false;
  areaChartPlugins = [];

  areaChartData: ChartConfiguration<'pie'>['data'] = {
    datasets: [
      {data: [10, 15, 20, 25] }
    ],
    labels: this.labels
  };

  areaChartOption: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
    this._cacheMetric$.subscribe(data => {
      if (data && data[this.dbKey]) {
        const chartData = {
          labels: this.labels,
          datasets: [
            { data: [
              data[this.dbKey].cacheHitRate,
              data[this.dbKey].indexScans,
              data[this.dbKey].tuplesReadFromIndex,
              data[this.dbKey].tuplesFetchedByIndex,
            ]}
          ]
        }
        this.areaChartData = Object.assign({}, chartData)
      }
    })
  }
}
