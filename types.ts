
export enum SignalType {
  DOC_EDIT = 'DOC_EDIT',
  TASK_REOPEN = 'TASK_REOPEN',
  APPROVAL_DELAY = 'APPROVAL_DELAY',
  CI_RETRY = 'CI_RETRY',
  THREAD_REVIVE = 'THREAD_REVIVE'
}

export enum SourceSystem {
  DOCS = 'docs',
  JIRA = 'jira',
  SLACK = 'slack',
  CI = 'ci',
  CUSTOM = 'custom'
}

export enum ObjectType {
  DOC = 'doc',
  TASK = 'task',
  DEPLOY = 'deploy',
  PROCESS = 'process'
}

export enum ActorRole {
  ENGINEER = 'engineer',
  QA = 'qa',
  OPS = 'ops',
  MANAGER = 'manager'
}

export interface Signal {
  id: string;
  signalType: SignalType;
  sourceSystem: SourceSystem;
  objectType: ObjectType;
  objectId: string;
  actorRole: ActorRole;
  intensity: number;
  projectId: string;
  timestamp: Date;
}

export interface GravityHistoryPoint {
  timestamp: Date;
  score: number;
}

export interface ShadowNode {
  id: string;
  objectType: ObjectType;
  objectId: string;
  projectId: string;
  interactionCount: number;
  reworkCount: number;
  roleSpread: number; // Distinct roles interacting
  gravityScore: number;
  createdAt: Date;
  lastActivityAt: Date;
  displayName: string;
  history?: GravityHistoryPoint[];
}

export interface ShadowEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  edgeType: 'handoff' | 'rework' | 'dependency';
  weight: number;
  projectId: string;
}

export enum InsightType {
  SHADOW_TASK = 'SHADOW_TASK',
  REWORK_LOOP = 'REWORK_LOOP',
  BOTTLENECK = 'BOTTLENECK',
  PHANTOM_OWNERSHIP = 'PHANTOM_OWNERSHIP'
}

export enum Severity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface ShadowInsight {
  id: string;
  type: InsightType;
  severity: Severity;
  confidence: number;
  description: string;
  relatedNodeIds: string[];
  projectId: string;
  createdAt: Date;
}

export interface WorkflowStep {
  id: string;
  name: string;
  order: number;
}

export interface DeclaredWorkflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  projectId: string;
  description: string;
}

export interface Intervention {
  id: string;
  nodeId: string;
  strategy: string;
  timestamp: Date;
  initialGravity: number;
  targetGravity: number;
  currentGravity: number;
  status: 'active' | 'resolved' | 'stalled';
}
