
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockNodes, mockInterventions } from '../mockData';
import { intelligence } from '../services/geminiService';
import { 
  ArrowLeft, 
  Users, 
  RotateCcw, 
  MousePointer2, 
  Clock,
  ShieldAlert,
  BrainCircuit,
  TrendingDown,
  TrendingUp,
  History,
  Loader2
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';

const NodeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const node = mockNodes.find(n => n.id === id);
  const interventions = mockInterventions.filter(i => i.nodeId === id);
  
  const [analysis, setAnalysis] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    interventions.forEach(async (int) => {
      setLoading(prev => ({ ...prev, [int.id]: true }));
      const verdict = await intelligence.analyzeInterventionEffectiveness(int, node?.history || []);
      setAnalysis(prev => ({ ...prev, [int.id]: verdict }));
      setLoading(prev => ({ ...prev, [int.id]: false }));
    });
  }, [id]);

  if (!node) return <div>Node not found</div>;

  const isImproving = node.history && node.history.length > 1 
    ? node.history[node.history.length - 1].score < node.history[0].score 
    : false;

  return (
    <div className="space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded uppercase">
              {node.objectType}
            </span>
            <span className="text-slate-500 text-sm">{node.objectId}</span>
          </div>
          <h1 className="text-4xl font-bold">{node.displayName}</h1>
        </div>
        <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="text-center px-4 border-r border-slate-700">
            <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Gravity Score</p>
            <p className={`text-2xl font-bold ${node.gravityScore > 70 ? 'text-amber-500' : 'text-emerald-500'}`}>{node.gravityScore.toFixed(1)}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">System Health</p>
            <div className="flex items-center gap-1 justify-center">
              {isImproving ? <TrendingDown className="w-4 h-4 text-emerald-500" /> : <TrendingUp className="w-4 h-4 text-amber-500" />}
              <p className={`text-2xl font-bold ${isImproving ? 'text-emerald-500' : 'text-amber-500'}`}>{isImproving ? 'Improving' : 'Strained'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {node.history && (
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" />
                Gravity History (Invisible Work Memory)
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={node.history.map(h => ({ time: h.timestamp.toLocaleDateString(), score: h.score }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#f1f5f9' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-emerald-400" />
              Historical Interventions
            </h2>
            <div className="space-y-6">
              {interventions.length > 0 ? interventions.map(int => (
                <div key={int.id} className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Strategy Deployed</p>
                      <h3 className="text-lg font-medium text-slate-200">{int.strategy}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${int.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      {int.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Initial</p>
                      <p className="text-lg font-bold text-slate-300">{int.initialGravity}G</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Target</p>
                      <p className="text-lg font-bold text-indigo-400">{int.targetGravity}G</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Current</p>
                      <p className={`text-lg font-bold ${int.currentGravity <= int.targetGravity ? 'text-emerald-500' : 'text-amber-500'}`}>{int.currentGravity}G</p>
                    </div>
                  </div>
                  <div className="bg-indigo-900/10 border border-indigo-500/20 p-4 rounded-lg">
                    <p className="text-[10px] text-indigo-400 uppercase font-bold mb-2 flex items-center gap-2">
                      <BrainCircuit className="w-3 h-3" /> System Retrospective
                    </p>
                    {loading[int.id] ? (
                      <div className="flex items-center gap-2 text-slate-500 text-xs italic">
                        <Loader2 className="w-3 h-3 animate-spin" /> Analyzing memory patterns...
                      </div>
                    ) : (
                      <p className="text-sm text-slate-300 italic leading-relaxed">
                        "{analysis[int.id]}"
                      </p>
                    )}
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center border-2 border-dashed border-slate-700 rounded-2xl opacity-40">
                  <p className="text-slate-500 italic">No historical interventions recorded for this node.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">Gravity Factors</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 flex items-center gap-2"><MousePointer2 className="w-4 h-4" /> Interactions</span>
                  <span className="text-slate-200 font-bold">{node.interactionCount}</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[80%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Rework Events</span>
                  <span className="text-slate-200 font-bold">{node.reworkCount}</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[35%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 flex items-center gap-2"><Users className="w-4 h-4" /> Role Spread</span>
                  <span className="text-slate-200 font-bold">{node.roleSpread}</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[60%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 flex items-center gap-2"><Clock className="w-4 h-4" /> Latency Factor</span>
                  <span className="text-slate-200 font-bold">1.4x</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-500 h-full w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-rose-950/20 border border-rose-500/30 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Friction Warning</h3>
            </div>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              This node has a "Gravity Loop" detected. Rework cycles are generating more coordination work than the original object value provides. Recommend converting this into a formal Task/Epic to gain tracking visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeDetail;
