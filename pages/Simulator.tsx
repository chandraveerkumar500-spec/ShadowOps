
import React, { useState } from 'react';
import { mockNodes } from '../mockData';
import { intelligence } from '../services/geminiService';
import { 
  Zap, 
  ArrowRight, 
  Play, 
  Settings2,
  BrainCircuit,
  Loader2
} from 'lucide-react';

const Simulator: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState(mockNodes[0].id);
  const [strategy, setStrategy] = useState('Remove manual approval gates and move to automated testing.');
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState<{ reduction: number; reasoning: string } | null>(null);

  const selectedNode = mockNodes.find(n => n.id === selectedNodeId);

  const handleSimulate = async () => {
    if (!selectedNode) return;
    setSimulating(true);
    setResult(null);
    const res = await intelligence.simulateIntervention(selectedNode, strategy);
    setResult(res);
    setSimulating(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">What-If Ops Simulator</h1>
        <p className="text-slate-400 mt-2">Predict how process changes will reduce system gravity before you implement them.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Target Shadow Node
            </label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedNodeId}
              onChange={(e) => setSelectedNodeId(e.target.value)}
            >
              {mockNodes.map(node => (
                <option key={node.id} value={node.id}>{node.displayName} ({node.gravityScore.toFixed(0)}G)</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" />
              Intervention Strategy
            </label>
            <textarea 
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Assign a single owner to reduce cross-role handoffs..."
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
            />
          </div>

          <button 
            onClick={handleSimulate}
            disabled={simulating}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
          >
            {simulating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            Run Simulation
          </button>
        </div>

        <div className="flex flex-col justify-center">
          {result ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-3xl text-center">
                <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Estimated Gravity Reduction</p>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-slate-500 line-through text-4xl font-bold">{selectedNode?.gravityScore.toFixed(0)}G</div>
                  <ArrowRight className="w-8 h-8 text-slate-600" />
                  <div className="text-emerald-400 text-6xl font-black">
                    {(selectedNode ? selectedNode.gravityScore - result.reduction : 0).toFixed(0)}G
                  </div>
                </div>
                <div className="mt-4 inline-block px-4 py-1 bg-emerald-500 text-emerald-950 text-xs font-bold rounded-full">
                  -{result.reduction.toFixed(1)}G Estimated Impact
                </div>
              </div>

              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Simulation Reasoning
                </h3>
                <p className="text-slate-300 leading-relaxed italic">
                  "{result.reasoning}"
                </p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 flex flex-col items-center text-center opacity-50">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-400">Ready to simulate</h3>
              <p className="text-slate-600 max-w-xs mt-2">Choose a node and a strategy to see the predicted organizational impact.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulator;
