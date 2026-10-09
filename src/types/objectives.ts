export type ObjectiveCategory =
  | 'All'
  | 'Core Aggregation'
  | 'AI & Automation'
  | 'Customer Experience'
  | 'Operations & Enterprise';

export interface SLAParameter {
  metricName: string;
  targetValue: string;
  currentStatus: 'Optimal' | 'Degraded' | 'Pending';
}

export interface PlatformObjective {
  id: string;
  code: string;
  name: string;
  description: string;
  category: Exclude<ObjectiveCategory, 'All'>;
  sla: SLAParameter;
  targetRoles: string[];
  associatedMicroservices: string[];
  featuresList: string[];
  iconSymbol: string;
}

export interface ObjectiveKPIOverview {
  totalObjectives: number;
  availabilitySLA: string;
  averageResponseSLA: string;
  digitalIssuanceTarget: string;
  activeCategoryCount: number;
}
