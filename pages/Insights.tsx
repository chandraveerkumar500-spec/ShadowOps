
import React from 'react';
import { mockInsights, mockNodes } from '../mockData';
import { AlertCircle, Zap, Ghost, RefreshCw, BarChart2 } from 'lucide-react';
import { InsightType, Severity } from '../types';

const Insights: React.FC = () => {
  const getIcon = (type: InsightType) => {
    switch (type) {
      case InsightType.PHANTOM_OWNERSHIP: return <Ghost className="w-6 h-6" />;
      case InsightType.REWORK_LOOP: return <RefreshCw className="w-6 h-6" />;
      case InsightType.SHADOW_TASK: return <Zap className="w-6 h-6" />;
      case InsightType.BOTTLENECK: return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getSeverityColor = (sev: Severity) => {
    switch (sev) {
      case Severity.HIGH: return 'border-rose-500/50 bg-rose-500/10 text-rose-400';
      case Severity.MEDIUM: return 'border-amber-500/50 bg-amber-500/10 text-amber-400';
      case Severity.LOW: return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">System Insights</h1>
        <p className="text-slate-400 mt-2">Inferred behavioral patterns that indicate operational misalignment.</p>
      </div>

      <div className="grid gap-6">
        {mockInsights.map(insight => (
          <div key={insight.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col md:flex-row">
            <div className={`p-8 flex items-center justify-center md:w-32 border-b md:border-b-0 md:border-r border-slate-700 ${getSeverityColor(insight.severity)}`}>
              {getIcon(insight.type)}
            </div>
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">{insight.type.replace('_', ' ')}</h3>
                  <h2 className="text-xl font-semibold text-slate-100">{insight.severity.toUpperCase()} Priority Signal</h2>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-bold uppercase">Confidence</p>
                  <p className="text-lg font-bold text-emerald-500">{(insight.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg mb-6">
                {insight.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {insight.relatedNodeIds.map(nodeId => {
                  const node = mockNodes.find(n => n.id === nodeId);
                  return (
                    <div key={nodeId} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300 border border-slate-600">
                      Affecting: {node?.displayName || nodeId}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 p-12 rounded-3xl flex flex-col items-center text-center">
        <BarChart2 className="w-12 h-12 text-slate-700 mb-4" />
        <h3 className="text-xl font-semibold text-slate-500">Scanning for new patterns...</h3>
        <p className="text-slate-600 max-w-md mt-2">ShadowOps is analyzing 14,000 metadata signals across Jira, Slack, and Docs to identify the next set of operational friction points.</p>
      </div>
    </div>
  );
};

export default Insights;
