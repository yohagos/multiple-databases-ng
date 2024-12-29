import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardLoadingService {
  private _loadingCountBehaviourSubject = new BehaviorSubject(true);
  public loadingCount$ = this._loadingCountBehaviourSubject.asObservable();

  private _loadingCacheBehaviourSubject = new BehaviorSubject(true);
  public loadingCache$ = this._loadingCacheBehaviourSubject.asObservable();

  private _loadingCacheChartBehaviourSubject = new BehaviorSubject(true);
  public loadingCacheChart$ = this._loadingCacheChartBehaviourSubject.asObservable();

  setLoadingCount(bool: boolean) {
    this._loadingCountBehaviourSubject.next(bool)
  }

  getLoadingCount() {
    return this.loadingCount$
  }

  setLoadingCache(bool: boolean) {
    this._loadingCacheBehaviourSubject.next(bool)
  }

  getLoadingCache() {
    return this.loadingCache$
  }

  setLoadingCacheChart(bool: boolean) {
    this._loadingCacheChartBehaviourSubject.next(bool)
  }

  getLoadingCacheChart() {
    return this.loadingCacheChart$
  }
}
