import { inject, Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { KeycloakService } from '../../../core/services/keycloak/keycloak.service';
import { MetricsAdapter } from '../../../core/adapters/metrics.adapter';
import { BehaviorSubject, Observable } from 'rxjs';
import { CacheMetricAnalytic, Metrics, MetricsAnalytic } from '../../../core/adapters/metrics.model';
import { DashboardLoadingService } from './dashboard-loading.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardBehaviourService {
  private _loadingService = inject(DashboardLoadingService)
  private _socketClient: any = null;
  private _keycloakService = inject(KeycloakService)
  private _metricsAdapter = inject(MetricsAdapter)

  private _metricsBehaviourSubject = new BehaviorSubject<Metrics[]>([])
  private _metrics$ = this._metricsBehaviourSubject.asObservable()

  private _splitMetricsBehaviourSubject = new BehaviorSubject<MetricsAnalytic>({})
  private _splitMetrics$ = this._splitMetricsBehaviourSubject.asObservable()

  private _cacheMetricBehaviorSubject = new BehaviorSubject<CacheMetricAnalytic>({})
  private _cacheMetric$ = this._cacheMetricBehaviorSubject.asObservable()

  private _databaseSelectedBehaviorSubject = new BehaviorSubject<string>('')
  private databaseSelected$ = this._databaseSelectedBehaviorSubject.asObservable()

  private readonly _stompUrl = 'http://localhost:9090/api/v1/ws';
  private readonly _headers = {'Authorization': 'Bearer ' + this._keycloakService.keyCloak.token};

  init() {
    const ws = new SockJS.default(this._stompUrl);
    this._socketClient = Stomp.over(ws);
    this._socketClient.debug = () => {}
    this._socketClient.connect(this._headers, this.onConnected.bind(this));
  }

  private onConnected() {
    const topic = '/topic/mds-metrics'
    this._socketClient.subscribe(topic, (message: any) => {
      if (message.body) {
        let data = JSON.parse(message.body)
        this.handleData(data)
      }
    })
  }

  private handleData(data: any) {
    const formatedData = JSON.parse(data)
    if (Array.isArray(formatedData)) {
      const transformedMetrics = formatedData.map(item => this._metricsAdapter.adapt(item))
      this._metricsBehaviourSubject.next(transformedMetrics)
      this.splitMetricsByDatabaseName(transformedMetrics)
    }
  }

  getMetrics(): Observable<Metrics[]> {
    return this._metrics$;
  }

  splitMetricsByDatabaseName(data: Metrics[]) {
    const result: MetricsAnalytic = {}
    data.forEach(item => {
      const dbName = item.databaseName
      if (!result[dbName]) {
        result[dbName] = []
      }
      result[dbName].push(item)
    })
    this._splitMetricsBehaviourSubject.next(result)
    this.generatePolarAreaChartData(result)
    this._loadingService.setLoadingCount(false)
    this._loadingService.setLoadingCache(false)
    this._loadingService.setLoadingCacheChart(false)
  }

  getSplitMetrics(): Observable<MetricsAnalytic> {
    return this._splitMetrics$
  }

  fillCacheMetric(data: CacheMetricAnalytic) {
    this._loadingService.setLoadingCacheChart(false)
    this._cacheMetricBehaviorSubject.next(data)
  }

  getCacheMetric() {
    return this._cacheMetric$
  }

  private generatePolarAreaChartData(metricsAnalytic: MetricsAnalytic) {
    const cacheMetric: CacheMetricAnalytic = {}
    const databaseSelectedForFiltering = this._databaseSelectedBehaviorSubject.value
    Object.keys(metricsAnalytic).forEach(dbName => {
      if (databaseSelectedForFiltering && databaseSelectedForFiltering !== '' && dbName === databaseSelectedForFiltering) {
        return
      }
        const metricsArray = metricsAnalytic[dbName];
        const maxMetrics = this.getMaxMetrics(metricsArray);
        cacheMetric[dbName] =
          {
            cacheHitRate: maxMetrics['cacheHitRate'],
            indexScans: maxMetrics['indexScans'],
            tuplesReadFromIndex: maxMetrics['tuplesReadFromIndex'],
            tuplesFetchedByIndex: maxMetrics['tuplesFetchedByIndex'],
          }

      }
    )
    this.fillCacheMetric(cacheMetric)
  }

  private getMaxMetrics(metrics: Metrics[]): { [key: string]: number } {
    return {
      cacheHitRate: Math.max(...metrics.map(m => m.cacheHitRate)),
      indexScans: Math.max(...metrics.map(m => m.indexScans)),
      tuplesReadFromIndex: Math.max(...metrics.map(m => m.tuplesReadFromIndex)),
      tuplesFetchedByIndex: Math.max(...metrics.map(m => m.tuplesFetchedByIndex))
    };
  }

  setDatabaseSelected(val: string) {
    this._databaseSelectedBehaviorSubject.next(val)
  }

  getDatabaseSelected() {
    return this.databaseSelected$
  }

  disconnect() {
    if (this._socketClient) {
      this._socketClient.disconnect()
      this._metricsBehaviourSubject.next([])
      this._metricsBehaviourSubject.complete()
    }
  }
}
