
import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Sliders, EyeOff, Save, BellRing } from 'lucide-react';

const Settings: React.FC = () => {
  const [privacyMode, setPrivacyMode] = useState(true);
  const [threshold, setThreshold] = useState(65);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <SettingsIcon className="text-slate-400" />
          Platform Configuration
        </h1>
        <p className="text-slate-400 mt-2">Adjust inference sensitivity and governance parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Governance & Privacy
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-200">Metadata-Only Ingestion</p>
                  <p className="text-sm text-slate-500">Block any ingestion of message content or identifiers.</p>
                </div>
                <button 
                  onClick={() => setPrivacyMode(!privacyMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${privacyMode ? 'bg-indigo-600' : 'bg-slate-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${privacyMode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-200">Anonymous Actor Mapping</p>
                  <p className="text-sm text-slate-500">Automatically map PII to role-based aliases.</p>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              Inference Engine
            </h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-slate-200">Gravity Alert Threshold</p>
                  <span className="text-indigo-400 font-bold">{threshold}G</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={threshold} 
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <p className="text-xs text-slate-500 italic">Nodes exceeding this score trigger high-severity insights.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Confidence Cutoff</p>
                  <select className="bg-transparent text-slate-300 text-sm focus:outline-none w-full">
                    <option>High (85% +)</option>
                    <option>Medium (65% +)</option>
                    <option>Discovery (all)</option>
                  </select>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Learning Rate</p>
                  <select className="bg-transparent text-slate-300 text-sm focus:outline-none w-full">
                    <option>Standard (Weekly)</option>
                    <option>Aggressive (Daily)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600/10 border border-indigo-500/30 p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-indigo-400 mb-4">
              <EyeOff className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase">Transparency</h3>
            </div>
            <p className="text-xs text-indigo-100/70 leading-relaxed mb-6">
              ShadowOps governance policies are cryptographically signed. Any change to these settings is logged in the immutable system audit trail.
            </p>
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
              <Save className="w-4 h-4" />
              Commit Changes
            </button>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h3 className="text-sm font-bold uppercase text-slate-500 mb-4 flex items-center gap-2">
              <BellRing className="w-4 h-4" />
              Notifications
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-slate-400">
                <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-900 text-indigo-600" />
                Slack Executive Summaries
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-400">
                <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-900 text-indigo-600" />
                High Gravity Alerts
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-400">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-900 text-indigo-600" />
                Intervention Success Reports
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
