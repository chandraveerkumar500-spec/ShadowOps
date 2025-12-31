
import React, { useState, useEffect } from 'react';
import { mockWorkflows, mockEdges, mockNodes } from '../mockData';
import { intelligence } from '../services/geminiService';
import { 
  Split, 
  ArrowRight, 
  CircleDot, 
  Activity, 
  ShieldAlert,
  Loader2,
  GitBranch,
  Repeat,
  Info
} from 'lucide-react';

const RealityMode: React.FC = () => {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(mockWorkflows[0].id);
  const [analysis, setAnalysis] = useState<string>('');
  const [pointExplanations, setPointExplanations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [pointLoading, setPointLoading] = useState<Record<string, boolean>>({});
  
  const workflow = mockWorkflows.find(w => w.id === selectedWorkflowId);

  // Dynamically extract metadata from mock data for AI context
  const prdNode = mockNodes.find(n => n.id === 'n1');
  const qaNode = mockNodes.find(n => n.id === 'n4');
  const secNode = mockNodes.find(n => n.id === 'n2');

  // Extract edge relationships for better context
  const getEdgeSummary = (nodeId: string) => {
    return mockEdges
      .filter(e => e.fromNodeId === nodeId || e.toNodeId === nodeId)
      .map(e => `${e.edgeType} (weight: ${e.weight})`)
      .join(', ');
  };

  const divergencePoints = [
    { 
      id: 'prd_rework', 
      name: 'PRD Rework Loops', 
      metadata: `Node Metadata: [interactionCount: ${prdNode?.interactionCount}, reworkCount: ${prdNode?.reworkCount}, roleSpread: ${prdNode?.roleSpread}]. Relationship Patterns (Edges): [${getEdgeSummary('n1')}]` 
    },
    { 
      id: 'security_bypass', 
      name: 'Security Review Bypass', 
      metadata: `Node Metadata: [interactionCount: ${secNode?.interactionCount}, roleSpread: ${secNode?.roleSpread}]. Relationship Patterns (Edges): [${getEdgeSummary('n2')}]` 
    },
    { 
      id: 'wiki_shadow', 
      name: 'Shadow Coordination Step', 
      metadata: `Node Metadata: [interactionCount: ${qaNode?.interactionCount}, reworkCount: ${qaNode?.reworkCount}, roleSpread: ${qaNode?.roleSpread}]. Relationship Patterns (Edges): [${getEdgeSummary('n4')}]` 
    }
  ];

  useEffect(() => {
    if (workflow) {
      setLoading(true);
      intelligence.analyzeDivergence(workflow, mockEdges, mockNodes).then(res => {
        setAnalysis(res);
        setLoading(false);
      });

      // Generate explanations for individual points using actual node and edge metadata
      divergencePoints.forEach(async (point) => {
        setPointLoading(prev => ({ ...prev, [point.id]: true }));
        const explanation = await intelligence.explainRootCause(point.name, point.metadata);
        setPointExplanations(prev => ({ ...prev, [point.id]: explanation }));
        setPointLoading(prev => ({ ...prev, [point.id]: false }));
      });
    }
  }, [selectedWorkflowId]);

  if (!workflow) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Split className="text-indigo-500" />
            Reality Mode
          </h1>
          <p className="text-slate-400 mt-2">Comparing SOP-defined workflows with observed shadow behavior.</p>
        </div>
        <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex">
          {mockWorkflows.map(w => (
            <button 
              key={w.id}
              onClick={() => setSelectedWorkflowId(w.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedWorkflowId === w.id ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {w.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Declared Reality */}
        <div className="space-y-6">
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 h-full">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
              <CircleDot className="w-4 h-4" />
              Declared Reality (SOP)
            </h2>
            <div className="relative space-y-12">
              {workflow.steps.map((step, idx) => (
                <div key={step.id} className="relative flex items-center gap-6">
                  {idx < workflow.steps.length - 1 && (
                    <div className="absolute left-[1.375rem] top-11 w-0.5 h-12 bg-slate-700"></div>
                  )}
                  <div className="w-11 h-11 rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center font-bold text-slate-400 z-10">
                    {step.order}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">{step.name}</h3>
                    <p className="text-xs text-slate-500 uppercase">Formal Milestone</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <p className="text-xs text-slate-400 italic">"The process as it exists in documentation and tool-defined states."</p>
            </div>
          </div>
        </div>

        {/* Observed Reality */}
        <div className="space-y-6">
          <div className="bg-slate-950 p-8 rounded-3xl border-2 border-indigo-500/20 shadow-2xl shadow-indigo-500/5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity className="w-64 h-64 text-indigo-500" />
            </div>
            
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-8 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Observed Reality (ShadowOps)
            </h2>

            <div className="relative space-y-12 z-10">
              {/* Dynamic visualization of reality vs declaration */}
              <div className="flex items-center gap-6 relative">
                 <div className="absolute left-[1.375rem] top-11 w-0.5 h-12 bg-indigo-500/30"></div>
                 <div className="w-11 h-11 rounded-full bg-indigo-900/30 border-4 border-indigo-500/50 flex items-center justify-center font-bold text-indigo-300 z-10 gravity-pull">1</div>
                 <div className="flex-1">
                    <h3 className="font-semibold text-slate-200">PRD Finalization</h3>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold rounded uppercase flex items-center gap-1">
                        <Repeat className="w-3 h-3" /> {prdNode?.reworkCount} Rework Loops
                      </div>
                      <span className="text-[10px] text-slate-500">{prdNode?.gravityScore.toFixed(1)} Gravity</span>
                    </div>
                    {/* AI Point Insight */}
                    <div className="mt-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex gap-3 shadow-inner ring-1 ring-inset ring-white/5">
                      <div className="p-1.5 bg-indigo-500/20 rounded-lg flex-shrink-0 self-start">
                        <Info className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-indigo-400 uppercase tracking-widest text-[10px] mb-1">Root Cause Hypothesis</p>
                        {pointLoading['prd_rework'] ? (
                          <div className="flex items-center gap-2 text-slate-500 italic">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Synthesizing node and edge patterns...
                          </div>
                        ) : (
                          <p className="italic leading-relaxed">
                            {pointExplanations['prd_rework']}
                          </p>
                        )}
                      </div>
                    </div>
                 </div>
              </div>

              {/* Bypassed Step Visualization */}
              <div className="flex items-center gap-6 relative group">
                 <div className="absolute left-[1.375rem] top-11 w-0.5 h-12 bg-slate-800"></div>
                 <div className="w-11 h-11 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center font-bold text-slate-600 z-10 opacity-30">2</div>
                 <div className="flex-1 opacity-30">
                    <h3 className="font-semibold text-slate-200">Security Review</h3>
                    <p className="text-xs text-rose-500 font-bold uppercase">Bypassed / Not Detected</p>
                 </div>
                 <div className="absolute -left-12 top-0 bottom-0 flex items-center">
                    <div className="w-8 h-px bg-rose-500/50"></div>
                 </div>
                 {/* AI Point Insight */}
                 <div className="absolute top-1 right-0 max-w-[200px] p-2.5 bg-rose-500/5 rounded-lg border border-rose-500/10 text-[10px] text-rose-300 italic flex gap-2 items-start shadow-sm backdrop-blur-sm">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 text-rose-500" />
                    <div>
                      {pointLoading['security_bypass'] ? '...' : pointExplanations['security_bypass']}
                    </div>
                 </div>
              </div>

              {/* Extra Step Visualization */}
              <div className="flex items-center gap-6 relative">
                 <div className="absolute left-[1.375rem] top-11 w-0.5 h-12 bg-indigo-500/30"></div>
                 <div className="w-11 h-11 rounded-full bg-indigo-600 border-4 border-indigo-400 flex items-center justify-center font-bold text-white z-10 shadow-lg shadow-indigo-500/40">
                    <GitBranch className="w-5 h-5" />
                 </div>
                 <div className="flex-1 bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <GitBranch className="w-12 h-12" />
                    </div>
                    <h3 className="font-semibold text-indigo-200 text-sm">SHADOW STEP: Wiki Coordination</h3>
                    <p className="text-[10px] text-indigo-400/80 font-medium">{qaNode?.gravityScore.toFixed(1)} Gravity well detected between QA and Dev roles.</p>
                    {/* AI Point Insight */}
                    <div className="mt-3 pt-3 border-t border-indigo-500/20 text-[10px] text-slate-400 italic flex gap-2">
                      <Info className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <div>
                        {pointLoading['wiki_shadow'] ? '...' : pointExplanations['wiki_shadow']}
                      </div>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-6 relative">
                 <div className="w-11 h-11 rounded-full bg-indigo-900/30 border-4 border-indigo-500/50 flex items-center justify-center font-bold text-indigo-300 z-10">4</div>
                 <div className="flex-1">
                    <h3 className="font-semibold text-slate-200">Prod Deployment</h3>
                    <div className="mt-2 text-[10px] text-slate-500">Normal synchronization detected.</div>
                 </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-indigo-900/20 rounded-2xl border border-indigo-500/30 relative">
              <div className="flex items-center gap-2 text-indigo-400 mb-4 font-bold text-xs uppercase tracking-widest text-center justify-center">
                <ShieldAlert className="w-4 h-4" />
                Divergence Analysis Summary
              </div>
              {loading ? (
                <div className="flex items-center gap-3 text-slate-500 text-sm justify-center italic py-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gemini is analyzing behavioral drift...
                </div>
              ) : (
                <div className="text-slate-300 text-sm leading-relaxed space-y-3 whitespace-pre-wrap text-center max-w-md mx-auto">
                  {analysis}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealityMode;
