import { Injectable } from "@angular/core";
import { Metrics } from "./metrics.model";

export interface Adapter<T> {
  adapt(item: any): T
}

@Injectable({
  providedIn: 'root',
})
export class MetricsAdapter implements Adapter<Metrics> {

  adapt(item: any) {
    return item as Metrics;
  }

  adaptList(arr: any[]) {
    return arr.map(item => this.adapt(item));
  }
}
