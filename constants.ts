import { PricingConfig } from './types';

export const PRICING_CONFIG: PricingConfig = {
  metrics: {
    id: 'metrics',
    name: 'Metrics',
    unit: 'Active Series',
    included: 10000,
    pricePerUnit: 6.50,
    unitStep: 1000,
    description: 'Standard active series. First 10k free. Deducts K8s credits.'
  },
  logs: {
    id: 'logs',
    name: 'Logs',
    unit: 'GB',
    included: 50,
    pricePerUnit: 0.50,
    unitStep: 1,
    description: 'Log ingestion (Loki). First 50GB free.'
  },
  traces: {
    id: 'traces',
    name: 'Traces',
    unit: 'GB',
    included: 50,
    pricePerUnit: 0.50,
    unitStep: 1,
    description: 'Trace ingestion (Tempo). First 50GB free.'
  },
  profiles: {
    id: 'profiles',
    name: 'Profiles',
    unit: 'GB',
    included: 50,
    pricePerUnit: 0.50,
    unitStep: 1,
    description: 'Continuous Profiling (Phlare). First 50GB free.'
  },
  users: {
    id: 'users',
    name: 'Standard Users',
    unit: 'Users',
    included: 3,
    pricePerUnit: 8.00,
    unitStep: 1,
    description: 'Active Grafana users. First 3 free.'
  },
  enterpriseUsers: {
    id: 'enterpriseUsers',
    name: 'Enterprise Users',
    unit: 'Users',
    included: 0,
    pricePerUnit: 55.00,
    unitStep: 1,
    description: 'Users with Enterprise plugins access.'
  },
  irmUsers: {
    id: 'irmUsers',
    name: 'IRM Users',
    unit: 'Users',
    included: 3,
    pricePerUnit: 20.00,
    unitStep: 1,
    description: 'Incident Response & Management users. First 3 free.'
  },
  k6: {
    id: 'k6',
    name: 'k6 Testing',
    unit: 'VUh',
    included: 500,
    pricePerUnit: 0.15,
    unitStep: 1,
    description: 'Virtual User Hours for performance testing.'
  },
  k8sHostHours: {
    id: 'k8sHostHours',
    name: 'K8s Host Hours',
    unit: 'Hours',
    included: 2232,
    pricePerUnit: 0.015,
    unitStep: 1,
    description: 'K8s Monitoring. 1 Host Hour = 600 Active Series Credit.'
  },
  k8sContainerHours: {
    id: 'k8sContainerHours',
    name: 'K8s Container Hours',
    unit: 'Hours',
    included: 37944,
    pricePerUnit: 0.001,
    unitStep: 1,
    description: 'Billable Container Hours.'
  },
  appHostHours: {
    id: 'appHostHours',
    name: 'App O11y Host Hours',
    unit: 'Hours',
    included: 2232,
    pricePerUnit: 0.04,
    unitStep: 1,
    description: 'Application Observability (host-based metering).'
  },
  frontendSessions: {
    id: 'frontendSessions',
    name: 'Frontend Sessions',
    unit: 'Sessions',
    included: 100000,
    pricePerUnit: 0.90,
    unitStep: 1000,
    description: 'Frontend Observability (Faro/RUM).'
  },
  syntheticsAPI: {
    id: 'syntheticsAPI',
    name: 'Synthetics (API)',
    unit: 'Checks',
    included: 100000,
    pricePerUnit: 5.00,
    unitStep: 10000,
    description: 'API test executions.'
  },
  syntheticsBrowser: {
    id: 'syntheticsBrowser',
    name: 'Synthetics (Browser)',
    unit: 'Checks',
    included: 10000,
    pricePerUnit: 50.00,
    unitStep: 10000,
    description: 'Browser test executions.'
  }
};

// Estimator multipliers (Heuristics)
export const ESTIMATOR_DEFAULTS = {
  SERIES_PER_HOST: 1500, // Node exporter + basic system metrics
  LOGS_GB_PER_HOST_DAY: 0.2, 

  // APM / Application Defaults
  SERIES_PER_APP_INSTANCE: 450, // Span metrics + custom app metrics
  TRACES_GB_PER_APP_INSTANCE_DAY: 0.5,
  LOGS_GB_PER_APP_INSTANCE_DAY: 0.1
};