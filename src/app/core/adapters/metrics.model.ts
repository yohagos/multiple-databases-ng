export class Metrics {
  constructor(
    public id: string,
    public databaseName: string,
    public tableCount: number,
    public totalAccesses: number,
    public totalExecutionTime: number,
    public avgResponseTime: number,
    public ioTime: number,
    public readTime: number,
    public writeTime: number,
    public bufferHits: number,
    public createdAt: Date,
    public committedTransactions: number,
    public rolledBackTransactions: number,
    public cacheHitRate : number,
    public indexScans: number,
    public tuplesReadFromIndex: number,
    public tuplesFetchedByIndex: number,
    public checkpointsTimed: number,
    public checkpointsReq: number,
    public checkpointsWriteTime: number,
    public checkpointsSyncTime: number,
    public totalConnections: number,
  ){}
}

export interface MetricsAnalytic {
  [key: string]: Metrics[]
}

export class CacheMetric {
  constructor(
    public cacheHitRate : number,
    public indexScans: number,
    public tuplesReadFromIndex: number,
    public tuplesFetchedByIndex: number
  ) {}
}

export interface CacheMetricAnalytic {
  [key: string]: CacheMetric
}
