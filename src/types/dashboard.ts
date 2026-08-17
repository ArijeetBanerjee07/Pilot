export type AgentStatus = 'running' | 'approval_required' | 'idle' | 'completed' | 'failed';

export interface AgentOperation {
  id: string;
  name: string;
  codename: string;
  category: 'Browser' | 'Research' | 'Optimizer' | 'QA' | 'Workflow';
  status: AgentStatus;
  runtime: string;
  tasksCount: number;
  successRate: number;
  progressPercent: number;
  model: string;
  lastAction: string;
  latencyMs: number;
  tokensUsed: string;
  cost: string;
  chartData?: number[];
  deltaRate?: string;
  deltaPositive?: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'completed' | 'improved' | 'started' | 'warning' | 'failed';
  title: string;
  timestamp: string;
  agent: string;
  details?: string;
}

export interface AttentionItem {
  id: string;
  type: 'approval' | 'failure' | 'warning';
  title: string;
  agent: string;
  severity: 'high' | 'medium' | 'low';
  time: string;
  actionLabel: string;
}

export interface DashboardMetrics {
  activeAgentsCount: number;
  needsAttentionCount: number;
  successRatePercent: number;
  totalRunsCount: number;
  totalTokensProcessed: string;
  systemStatus: string;
  notificationsCount: number;
  userName: string;
}

export type DashboardStyle = 2 | 4;
