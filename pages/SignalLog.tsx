
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Database, Trash2, Download } from 'lucide-react';
import { SignalType, SourceSystem, ActorRole } from '../types';

interface LogEntry {
  id: string;
  timestamp: string;
  type: SignalType;
  source: SourceSystem;
  role: ActorRole;
  objectId: string;
}

const SignalLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulation of incoming signals
  useEffect(() => {
    const interval = setInterval(() => {
      const types = Object.values(SignalType);
      const sources = Object.values(SourceSystem);
      const roles = Object.values(ActorRole);
      
      const newEntry: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: types[Math.floor(Math.random() * types.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        objectId: `obj_${Math.floor(Math.random() * 9000) + 1000}`
      };

      setLogs(prev => [newEntry, ...prev].slice(0, 50));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Terminal className="text-emerald-500" />
            Signal Stream
          </h1>
          <p className="text-slate-400 mt-2">Live feed of metadata events being processed by the Shadow Engine.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setLogs([])} className="p-2 text-slate-500 hover:text-rose-400 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-2 hover:bg-slate-700 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden font-mono text-[11px]">
          <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-500">
            <span>LIVE METADATA FEED</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ACTIVE
            </div>
          </div>
          <div className="h-[600px] overflow-y-auto p-4 space-y-1" ref={scrollRef}>
            {logs.length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-700 italic">
                Waiting for behavioral signals...
              </div>
            )}
            {logs.map((log) => (
              <div key={log.id} className="grid grid-cols-6 gap-2 hover:bg-white/5 py-1 px-2 rounded transition-colors group">
                <span className="text-slate-600">[{log.timestamp}]</span>
                <span className="text-indigo-400 font-bold">{log.type}</span>
                <span className="text-slate-500">{log.source}</span>
                <span className="text-emerald-500/70">{log.role}</span>
                <span className="text-slate-400">{log.objectId}</span>
                <span className="text-slate-700 text-right opacity-0 group-hover:opacity-100 transition-opacity">id:{log.id}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Engine Stats
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Buffer Depth</p>
                <p className="text-xl font-bold">128ms</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Privacy Filter Delay</p>
                <p className="text-xl font-bold">4.2s</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Dropped Packets</p>
                <p className="text-xl font-bold text-emerald-500">0.00%</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" /> Persistence
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              Signals are stored in a cold-vault for 30 days before being summarized into permanent process patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalLog;
