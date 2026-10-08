import React from 'react';
import { Settings as SettingsIcon, Shield, Users, Clock, AlertTriangle, RotateCcw, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';

const Settings = () => {
  const heartbeat = useStore((s) => s.heartbeat);
  const setHeartbeatInterval = useStore((s) => s.setHeartbeatInterval);
  const panicLock = useStore((s) => s.app.panicLock);
  const panicLockFn = useStore((s) => s.panicLock);
  const unlockPanic = useStore((s) => s.unlockPanic);
  const resetAll = useStore((s) => s.resetAll);
  const app = useStore((s) => s.app);

  const toggleEmergencyLock = () => {
    if (panicLock) {
      unlockPanic();
    } else {
      panicLockFn();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-cyan-400" />
          Settings
        </h1>
        <p className="text-slate-400">Configure your security preferences and system parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-l-4 border-cyan-500">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" /> Profile
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 font-mono uppercase mb-1">Name</label>
              <div className="w-full bg-slate-900/50 border border-white/5 rounded-lg px-4 py-2 text-slate-300">
                {app.currentUser?.name || 'Alex Chen'}
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 font-mono uppercase mb-1">Email</label>
              <div className="w-full bg-slate-900/50 border border-white/5 rounded-lg px-4 py-2 text-slate-300">
                {app.currentUser?.email || 'alex.chen@demo.com'}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-amber-500">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" /> Heartbeat Interval
          </h3>
          <div className="space-y-4">
            <input 
              type="range" 
              min="7" max="90" 
              value={heartbeat.interval}
              onChange={(e) => setHeartbeatInterval(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Required Check-in:</span>
              <span className="font-mono text-amber-400 font-bold">{heartbeat.interval} Days</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-violet-500">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-400" /> Security Preferences
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-slate-300 group-hover:text-white transition-colors">2FA Required for Check-ins</span>
              <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-cyan-500">
                <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform" />
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-slate-300 group-hover:text-white transition-colors">Encrypted Email Notifications</span>
              <div className="relative inline-flex items-center h-6 rounded-full w-11 bg-cyan-500">
                <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform" />
              </div>
            </label>
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-red-500">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-400" /> Emergency Panic Lock
          </h3>
          <p className="text-sm text-slate-400 mb-4">Instantly halts all timers and prevents any data release until manually disabled.</p>
          <button 
            onClick={toggleEmergencyLock}
            className={`w-full py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
              panicLock 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
                : 'bg-slate-800 text-white border border-white/10 hover:bg-slate-700'
            }`}
          >
            {panicLock ? 'Disable Emergency Lock' : 'Activate Panic Lock'}
          </button>
        </div>
      </div>

      <div className="glass-card p-6 border border-red-500/30 bg-red-500/5">
        <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Danger Zone
        </h3>
        <p className="text-sm text-slate-400 mb-4">Resetting data will clear your simulated state for this demo application.</p>
        <button 
          onClick={resetAll}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/50 font-medium transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset All Data
        </button>
      </div>
      
      <div className="text-center text-xs text-slate-600 mt-8">
        Privacy Disclaimer: This is a frontend simulation. No actual data is stored remotely.
      </div>
    </div>
  );
};

export default Settings;
