
import { 
  ObjectType, 
  ShadowNode, 
  ShadowEdge, 
  ShadowInsight, 
  InsightType, 
  Severity,
  DeclaredWorkflow,
  Intervention
} from './types';

export const mockNodes: ShadowNode[] = [
  {
    id: 'n1',
    objectType: ObjectType.DOC,
    objectId: 'PRD-2025-CORE',
    projectId: 'alpha',
    interactionCount: 145,
    reworkCount: 22,
    roleSpread: 4,
    gravityScore: 84.5,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastActivityAt: new Date(),
    displayName: 'Core Platform PRD (v4 Revision)',
    history: [
      { timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), score: 95.0 },
      { timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), score: 92.4 },
      { timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), score: 88.1 },
      { timestamp: new Date(), score: 84.5 }
    ]
  },
  {
    id: 'n2',
    objectType: ObjectType.PROCESS,
    objectId: 'SEC-REVIEW-ADHOC',
    projectId: 'alpha',
    interactionCount: 89,
    reworkCount: 12,
    roleSpread: 3,
    gravityScore: 62.1,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    lastActivityAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    displayName: 'Ad-hoc Security Patching',
    history: [
      { timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), score: 45.0 },
      { timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), score: 55.2 },
      { timestamp: new Date(), score: 62.1 }
    ]
  },
  {
    id: 'n3',
    objectType: ObjectType.TASK,
    objectId: 'OPS-1123',
    projectId: 'alpha',
    interactionCount: 25,
    reworkCount: 2,
    roleSpread: 2,
    gravityScore: 15.2,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastActivityAt: new Date(Date.now() - 10 * 60 * 1000),
    displayName: 'CI Pipeline Optimization'
  },
  {
    id: 'n4',
    objectType: ObjectType.DOC,
    objectId: 'INTERNAL-WIKI-QA',
    projectId: 'alpha',
    interactionCount: 210,
    reworkCount: 45,
    roleSpread: 5,
    gravityScore: 95.8,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    lastActivityAt: new Date(),
    displayName: 'QA Test Procedure (Stale Draft)',
    history: [
      { timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), score: 80.0 },
      { timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), score: 92.5 },
      { timestamp: new Date(), score: 95.8 }
    ]
  },
  {
    id: 'n5',
    objectType: ObjectType.DEPLOY,
    objectId: 'PROD-ROLLOUT-G1',
    projectId: 'alpha',
    interactionCount: 56,
    reworkCount: 8,
    roleSpread: 4,
    gravityScore: 42.4,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastActivityAt: new Date(),
    displayName: 'Weekly Production Rollout'
  }
];

export const mockInterventions: Intervention[] = [
  {
    id: 'int1',
    nodeId: 'n1',
    strategy: 'Assign explicit architect owner to PRD phase to reduce cross-role coordination drift.',
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    initialGravity: 95.0,
    targetGravity: 65.0,
    currentGravity: 84.5,
    status: 'active'
  },
  {
    id: 'int2',
    nodeId: 'n3',
    strategy: 'Automate deployment checks for CI optimizations.',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    initialGravity: 35.0,
    targetGravity: 10.0,
    currentGravity: 15.2,
    status: 'resolved'
  }
];

export const mockEdges: ShadowEdge[] = [
  { id: 'e1', fromNodeId: 'n1', toNodeId: 'n4', edgeType: 'dependency', weight: 4, projectId: 'alpha' },
  { id: 'e2', fromNodeId: 'n4', toNodeId: 'n2', edgeType: 'handoff', weight: 2, projectId: 'alpha' },
  { id: 'e3', fromNodeId: 'n2', toNodeId: 'n5', edgeType: 'handoff', weight: 5, projectId: 'alpha' },
  { id: 'e4', fromNodeId: 'n4', toNodeId: 'n4', edgeType: 'rework', weight: 8, projectId: 'alpha' }
];

export const mockInsights: ShadowInsight[] = [
  {
    id: 'i1',
    type: InsightType.PHANTOM_OWNERSHIP,
    severity: Severity.HIGH,
    confidence: 0.92,
    description: 'The Core PRD exhibits massive interaction volume from multiple roles without a formal task structure. It is acting as a shadow command-and-control center.',
    relatedNodeIds: ['n1'],
    projectId: 'alpha',
    createdAt: new Date()
  },
  {
    id: 'i2',
    type: InsightType.REWORK_LOOP,
    severity: Severity.MEDIUM,
    confidence: 0.85,
    description: 'QA Test Procedures are in a constant state of revision (8 rework cycles detected). This suggests the documentation format is incompatible with the release velocity.',
    relatedNodeIds: ['n4'],
    projectId: 'alpha',
    createdAt: new Date()
  },
  {
    id: 'i3',
    type: InsightType.SHADOW_TASK,
    severity: Severity.LOW,
    confidence: 0.78,
    description: 'Security patching activity is occurring outside of tracked tickets. 12 distinct interventions detected in the last 15 days.',
    relatedNodeIds: ['n2'],
    projectId: 'alpha',
    createdAt: new Date()
  }
];

export const mockWorkflows: DeclaredWorkflow[] = [
  {
    id: 'w1',
    name: 'Standard Release Cycle',
    projectId: 'alpha',
    description: 'The formal process for taking a feature from PRD to Production deployment.',
    steps: [
      { id: 's1', name: 'PRD Finalization', order: 1 },
      { id: 's2', name: 'Security Review', order: 2 },
      { id: 's3', name: 'QA Validation', order: 3 },
      { id: 's4', name: 'Prod Deployment', order: 4 }
    ]
  }
];
