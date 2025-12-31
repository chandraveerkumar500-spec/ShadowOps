
import React from 'react';
import { Unplug, CheckCircle2, AlertCircle, RefreshCw, Plus } from 'lucide-react';

const Connect: React.FC = () => {
  const sources = [
    { name: 'Jira Software', type: 'Metadata', status: 'connected', health: 98, lastSync: '2m ago' },
    { name: 'Slack Enterprise', type: 'Graph Only', status: 'connected', health: 100, lastSync: 'Just now' },
    { name: 'Google Workspace', type: 'Edit Signals', status: 'error', health: 0, lastSync: '14h ago' },
    { name: 'GitHub Actions', type: 'CI Metrics', status: 'connected', health: 95, lastSync: '1h ago' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Unplug className="text-indigo-500" />
            Integrations
          </h1>
          <p className="text-slate-400 mt-2">Manage metadata sources and check connection health.</p>
        </div>
        <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" /> Connect Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sources.map((source) => (
          <div key={source.name} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 group hover:border-indigo-500/50 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${source.status === 'connected' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {source.status === 'connected' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100">{source.name}</h3>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{source.type}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${source.status === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {source.status}
                </span>
                <p className="text-[10px] text-slate-600 mt-1 font-mono">{source.lastSync}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Signal Integrity</span>
                <span className="font-bold text-slate-200">{source.health}%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${source.health > 90 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                  style={{ width: `${source.health}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50 flex gap-3">
              <button className="flex-1 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-400/5 transition-all">
                Config
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex items-center gap-6">
        <div className="w-12 h-12 bg-indigo-600/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Unplug className="w-6 h-6 text-indigo-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-200">How Integrations Work</h3>
          <p className="text-sm text-slate-500 mt-1">
            ShadowOps uses read-only OAuth connections to fetch high-level metadata only. We never ingest message bodies, document content, or source code.
          </p>
        </div>
        <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
          Read Privacy Whitepaper
        </button>
      </div>
    </div>
  );
};

export default Connect;
