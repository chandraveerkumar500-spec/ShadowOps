
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingDown, 
  Layers, 
  Weight, 
  Ghost, 
  ArrowUpRight,
  Info,
  BrainCircuit,
  CheckCircle2
} from 'lucide-react';
import { mockNodes, mockInsights, mockInterventions } from '../mockData';
import { intelligence } from '../services/geminiService';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<string>("Analyzing recent operational metadata...");
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    intelligence.generateExecutiveSummary(mockNodes, mockInsights).then(res => {
      setSummary(res);
      setLoadingSummary(false);
    });
  }, []);

  const totalGravity = mockNodes.reduce((acc, n) => acc + n.gravityScore, 0);
  const invisibleWorkCount = mockNodes.filter(n => n.objectType !== 'task').length;
  const trustIndex = 63; // Mock value
  const resolvedInterventions = mockInterventions.filter(i => i.status === 'resolved').length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Shadow Nodes</span>
          </div>
          <p className="text-3xl font-bold">{invisibleWorkCount}</p>
          <p className="text-slate-400 text-sm mt-1">Untracked work objects</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Weight className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Total Gravity</span>
          </div>
          <p className="text-3xl font-bold">{totalGravity.toFixed(1)}</p>
          <p className="text-slate-400 text-sm mt-1">System friction index</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Memory Success</span>
          </div>
          <p className="text-3xl font-bold">{resolvedInterventions}/{mockInterventions.length}</p>
          <p className="text-slate-400 text-sm mt-1">Interventions resolved</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <Ghost className="w-5 h-5 text-rose-400" />
            </div>
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Phantom Owners</span>
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-slate-400 text-sm mt-1">Roles compensating systems</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              Executive Briefing
              <div className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] rounded uppercase font-bold">Inferred by AI</div>
            </h2>
            <div className={`text-slate-300 leading-relaxed text-lg italic ${loadingSummary ? 'animate-pulse' : ''}`}>
              "{summary}"
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-8">Work Gravity Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockNodes.map(n => ({ name: n.displayName, gravity: n.gravityScore }))}>
                  <defs>
                    <linearGradient id="colorGravity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" hide />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#f1f5f9' }}
                  />
                  <Area type="monotone" dataKey="gravity" stroke="#6366f1" fillOpacity={1} fill="url(#colorGravity)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              Invisible Work Memory
            </h2>
            <div className="space-y-4">
              {mockInterventions.map(int => {
                const node = mockNodes.find(n => n.id === int.nodeId);
                const reduction = int.initialGravity - int.currentGravity;
                return (
                  <div key={int.id} className="p-3 rounded-lg bg-slate-800 border border-slate-700">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{node?.displayName}</p>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${int.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {int.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-tight mb-2 truncate">{int.strategy}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, (reduction / (int.initialGravity - int.targetGravity)) * 100)}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400">-{reduction.toFixed(0)}G</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-indigo-900/20 p-6 rounded-2xl border border-indigo-500/30">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Intelligence Note
            </h3>
            <p className="text-xs text-indigo-100/70 leading-relaxed">
              Historical memory shows that "Process Bypasses" are 40% more likely to recur if ownership is not explicitly declared in Jira within 30 days of detection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
