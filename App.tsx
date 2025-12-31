
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Lightbulb, 
  Settings as SettingsIcon, 
  ChevronRight, 
  ShieldCheck,
  Zap,
  Activity,
  Box,
  Binary,
  Terminal,
  Unplug
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import FrictionMap from './pages/FrictionMap';
import Insights from './pages/Insights';
import NodeDetail from './pages/NodeDetail';
import Simulator from './pages/Simulator';
import RealityMode from './pages/RealityMode';
import Settings from './pages/Settings';
import SignalLog from './pages/SignalLog';
import Connect from './pages/Connect';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">ShadowOps<span className="text-indigo-500 italic">™</span></span>
        </div>

        <nav className="space-y-1">
          <Link to="/" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/') ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link to="/friction-map" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/friction-map') ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
            <Map className="w-5 h-5" />
            <span className="font-medium text-sm">Friction Map</span>
          </Link>
          <Link to="/reality-mode" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/reality-mode') ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
            <Binary className="w-5 h-5" />
            <span className="font-medium text-sm">Reality Mode</span>
          </Link>
          <Link to="/insights" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/insights') ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
            <Lightbulb className="w-5 h-5" />
            <span className="font-medium text-sm">Insights</span>
          </Link>
          <Link to="/simulator" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/simulator') ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
            <Zap className="w-5 h-5" />
            <span className="font-medium text-sm">What-If Simulator</span>
          </Link>
          <div className="pt-4 pb-2">
            <p className="text-[10px] uppercase font-bold text-slate-600 px-3 mb-2 tracking-widest">System</p>
            <Link to="/logs" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/logs') ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Terminal className="w-5 h-5" />
              <span className="font-medium text-sm">Signal Log</span>
            </Link>
            <Link to="/connect" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/connect') ? 'bg-slate-800 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Unplug className="w-5 h-5" />
              <span className="font-medium text-sm">Integrations</span>
            </Link>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
          <Activity className="w-4 h-4 text-emerald-500" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">System Status</p>
            <p className="text-xs text-slate-300">Scanning 42 signals/sec</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
    <div className="flex items-center gap-4 text-sm text-slate-400">
      <span>Project: <span className="text-slate-200 font-medium">Alpha-Prime</span></span>
      <ChevronRight className="w-4 h-4" />
      <span className="text-slate-200">System Visibility Mode</span>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-300 border border-slate-700">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
        Privacy Guaranteed
      </div>
      <Link to="/settings" className="p-2 text-slate-400 hover:text-slate-100 transition-colors">
        <SettingsIcon className="w-5 h-5" />
      </Link>
    </div>
  </header>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex bg-slate-900 text-slate-100">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Header />
          <div className="p-8 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/friction-map" element={<FrictionMap />} />
              <Route path="/reality-mode" element={<RealityMode />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/node/:id" element={<NodeDetail />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logs" element={<SignalLog />} />
              <Route path="/connect" element={<Connect />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
