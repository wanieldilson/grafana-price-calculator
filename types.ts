export enum PricingTier {
  FREE = 'FREE',
  PRO = 'PRO'
}

export interface PricingItem {
  id: string;
  name: string;
  unit: string;
  included: number;
  pricePerUnit: number;
  unitStep: number; // e.g., 1000 series
  description: string;
}

export interface PricingConfig {
  metrics: PricingItem;
  logs: PricingItem;
  traces: PricingItem;
  profiles: PricingItem;
  users: PricingItem;
  enterpriseUsers: PricingItem; // New
  irmUsers: PricingItem;
  k6: PricingItem;
  k8sHostHours: PricingItem;
  k8sContainerHours: PricingItem;
  appHostHours: PricingItem;
  frontendSessions: PricingItem;
  syntheticsAPI: PricingItem;
  syntheticsBrowser: PricingItem;
}

export interface CalculatorState {
  metricsSeries: number;
  logsGB: number;
  tracesGB: number;
  profilesGB: number;
  users: number;
  enterpriseUsers: number; // New
  irmUsers: number;
  k6VUh: number;
  k8sHostHours: number;
  k8sContainerHours: number;
  appHostHours: number;
  frontendSessions: number;
  syntheticsAPIExecutions: number;
  syntheticsBrowserExecutions: number;
}

export interface EstimatorState {
  // Infrastructure
  hosts: number;
  avgDailyLogsPerHostGB: number;

  // Applications (APM)
  appInstances: number;
  avgSeriesPerAppInstance: number;
  avgDailyTracesPerAppInstanceGB: number;
  avgDailyLogsPerAppInstanceGB: number;
}