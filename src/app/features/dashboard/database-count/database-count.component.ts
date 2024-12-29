import { AfterViewInit, Component, inject } from '@angular/core';
import { Metrics, MetricsAnalytic } from '../../../core/adapters/metrics.model';
import { Observable } from 'rxjs';
import { DashboardBehaviourService } from '../services/dashboard-behaviour.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration, ChartDataset } from "chart.js";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardLoadingService } from '../services/dashboard-loading.service';


@Component({
  selector: 'app-database-count',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    MatProgressSpinnerModule
  ],
  templateUrl: './database-count.component.html',
  styleUrl: './database-count.component.scss'
})
export class DatabaseCountComponent implements AfterViewInit {
  private _dashboardBehaviourService = inject(DashboardBehaviourService)
  metrics$: Observable<Metrics[]> = this._dashboardBehaviourService.getMetrics()
  databaseSelectedForFiltering$: Observable<string> = this._dashboardBehaviourService.getDatabaseSelected()
  splitMetrics$: Observable<MetricsAnalytic> = this._dashboardBehaviourService.getSplitMetrics()

  private _loadingBehaviorService = inject(DashboardLoadingService)

  barChartLegend = true
  barChartPlugins = []

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Databases'],
    datasets: [
      {data: [0, 0]}
    ]
  }

  barChartOption: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  ngAfterViewInit() {
    this.splitMetrics$.subscribe(data => {
      this.barChartData = Object.assign({}, this.fromDataViewToChartView(data))
    })
  }

  private fromDataViewToChartView(backendData: MetricsAnalytic): ChartConfiguration<'bar'>['data'] {
    let databaseSelectedForFiltering: string
    this.databaseSelectedForFiltering$.subscribe(data => {
      databaseSelectedForFiltering = data
    })

    if (Object.keys(backendData).length > 0) {
      const labels = Object.keys(backendData).sort()
      const dataSets: ChartDataset<"bar", (number | [number, number] | null)[]>[] | ChartDataset | { data: number[]; }[] = []
      labels.forEach(element => {
        if (databaseSelectedForFiltering && databaseSelectedForFiltering !== '') {
          if (databaseSelectedForFiltering === element) {
            const bd = backendData[element]
            const highestTableCount = bd.reduce((max, current) => {
              return current.tableCount > max ? current.tableCount : max
            }, 0)
            dataSets.push(
              { data: [highestTableCount], label: element }
            )
          } else {
            return
          }

        } else {
          const bd = backendData[element]
          const highestTableCount = bd.reduce((max, current) => {
            return current.tableCount > max ? current.tableCount : max
          }, 0)
          dataSets.push(
            { data: [highestTableCount], label: element }
          )
        }
      })
      const chartUpdate: ChartConfiguration<'bar'>['data'] = {
        labels: ['Databases'],
        datasets: dataSets as ChartDataset<"bar", (number | [number, number] | null)[]>[]
      }
      this.barChartData = Object.assign({}, chartUpdate)
      this._loadingBehaviorService.setLoadingCount(false)
    }
    return this.barChartData
  }
}
