import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Heart, Users, AlertTriangle, Lock, Eye, Activity, Power, CheckCircle2, ArrowUpRight, Sparkles, Key, FileCheck2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const SecurityMeter = ({ score }: { score: number }) => {
  const getGradient = () => {
    if (score >= 90) return { start: '#10b981', middle: '#06b6d4', end: '#a855f7' };
    if (score >= 70) return { start: '#f59e0b', middle: '#06b6d4', end: '#3b82f6' };
    return { start: '#ef4444', middle: '#f59e0b', end: '#dc2626' };
  };
  const grad = getGradient();

  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="7" />
        <motion.circle
          cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGradMulti)" strokeWidth="7"
          strokeLinecap="round" strokeDasharray={264}
          initial={{ strokeDashoffset: 264 }}
          animate={{ strokeDashoffset: 264 - (264 * score) / 100 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="scoreGradMulti" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={grad.start} />
            <stop offset="50%" stopColor={grad.middle} />
            <stop offset="100%" stopColor={grad.end} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-400">
          {score}
        </span>
        <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">HEALTH SCORE</span>
        <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-0.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          OPTIMAL
        </span>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const app = useStore((s) => s.app);
  const heartbeat = useStore((s) => s.heartbeat);
  const securityScore = useStore((s) => s.securityScore);
  const contacts = useStore((s) => s.contacts);
  const auditLog = useStore((s) => s.auditLog);
  const vaultItems = useStore((s) => s.vaultItems);
  const triggerEmergency = useStore((s) => s.triggerEmergency);
  const cancelEmergency = useStore((s) => s.cancelEmergency);
  const panicLockFn = useStore((s) => s.panicLock);
  const unlockPanic = useStore((s) => s.unlockPanic);
  const checkIn = useStore((s) => s.checkIn);
  const navigate = useNavigate();

  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyStep, setEmergencyStep] = useState(0);

  const emergencyMode = app.emergencyMode;
  const isPanicLocked = app.panicLock;
  const verifiedContacts = contacts.filter(c => c.verified).length;

  const simulateEmergency = () => {
    setShowEmergencyModal(true);
    setEmergencyStep(0);
    const timer = setInterval(() => {
      setEmergencyStep(prev => {
        if (prev >= 6) { clearInterval(timer); return prev; }
        return prev + 1;
      });
    }, 800);
    setTimeout(() => triggerEmergency(), 200);
  };

  const activityData = [
    { day: 'Mon', events: 12 },
    { day: 'Tue', events: 18 },
    { day: 'Wed', events: 8 },
    { day: 'Thu', events: 24 },
    { day: 'Fri', events: 15 },
    { day: 'Sat', events: 9 },
    { day: 'Sun', events: 21 },
  ];

  const emergencySteps = [
    '⚠ INACTIVITY DETECTED',
    'HEARTBEAT TIMEOUT CONFIRMED',
    'GRACE PERIOD EXPIRED (24H)',
    'TRUST NETWORK ACTIVATED',
    'AWAITING MULTI-SIGNATURE CONSENSUS (2/3)',
    'VAULT RELEASE PENDING AUTHORIZATION',
    '✓ DIGITAL LEGACY SECURED & RECOVERABLE',
  ];

  const heartbeatStatusLabel = heartbeat.status === 'healthy' ? 'Healthy (30d)' :
    heartbeat.status === 'warning' ? 'Warning (24h)' :
    heartbeat.status === 'missed' ? 'MISSED TIMEOUT' : 'Critical';

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Active Emergency Warning Ribbon */}
      {emergencyMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-950/90 via-rose-900/80 to-red-950/90 border border-red-500/60 text-red-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl glow-red"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/40 text-red-400">
              <AlertTriangle className="animate-bounce w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white tracking-wide">EMERGENCY PROTOCOL ACTIVE</h4>
              <p className="text-xs text-red-300/80 mt-0.5">Multi-signature authorization underway. 2 of 3 trusted keys required.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/emergency')}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
            >
              Open Emergency Center
            </button>
            <button
              onClick={cancelEmergency}
              className="px-3 py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs border border-slate-700 transition-colors"
            >
              Reset Protocol
            </button>
          </div>
        </motion.div>
      )}

      {/* Panic Lock Frozen State Banner */}
      {isPanicLocked && (
        <div className="bg-gradient-to-r from-blue-950/90 via-indigo-900/80 to-blue-950/90 border border-blue-500/60 text-blue-200 p-5 rounded-2xl flex items-center justify-between shadow-2xl">
          <div className="flex items-center space-x-3">
            <Lock className="w-6 h-6 text-cyan-400 animate-pulse" />
            <div>
              <h4 className="font-bold text-sm text-white">PANIC LOCK ENGAGED</h4>
              <p className="text-xs text-blue-300/80">All release timers and cryptographic accesses are completely frozen.</p>
            </div>
          </div>
          <button
            onClick={unlockPanic}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
          >
            Release Lock
          </button>
        </div>
      )}

      {/* Hero Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono">
              ZERO-TRUST ACTIVE
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-purple-950 text-purple-400 border border-purple-800/60 font-mono">
              AES-256 VAULT
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
            Digital Legacy Command Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">Autonomous monitoring • Cryptographic heartbeat active</p>
        </div>

        {/* Global Action CTAs */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => isPanicLocked ? unlockPanic() : panicLockFn()}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              isPanicLocked 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/30' 
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Lock className="w-4 h-4 text-cyan-400" />
            {isPanicLocked ? 'Unlock System' : 'Emergency Lock'}
          </button>

          <button
            onClick={simulateEmergency}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Simulate Emergency
          </button>
        </div>
      </header>

      {/* 4 Distinct Color-Themed Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Vault (Emerald & Mint) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onClick={() => navigate('/vault')}
          className="glass-card p-5 border-l-4 border-l-emerald-400 hover:border-emerald-500/60 transition-all cursor-pointer group bg-gradient-to-br from-emerald-950/20 via-slate-900/70 to-slate-900/90"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-emerald-400/90 text-[11px] font-bold uppercase tracking-wider">VAULT STATUS</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white">
            {isPanicLocked ? 'LOCKED DOWN' : 'Fully Secured'}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
            <span>{vaultItems.length} Encrypted Items</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        {/* Card 2: Heartbeat (Coral & Rose) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/heartbeat')}
          className={`glass-card p-5 border-l-4 ${
            heartbeat.status === 'healthy' ? 'border-l-rose-400' : 'border-l-red-500'
          } hover:border-rose-500/60 transition-all cursor-pointer group bg-gradient-to-br from-rose-950/20 via-slate-900/70 to-slate-900/90`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-rose-400/90 text-[11px] font-bold uppercase tracking-wider">HEARTBEAT</span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 group-hover:scale-110 transition-transform">
              <Heart className={`w-4 h-4 ${heartbeat.status === 'healthy' ? 'animate-pulse' : ''}`} />
            </div>
          </div>
          <div className="text-xl font-black text-white">
            {heartbeatStatusLabel}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
            <span>{heartbeat.consecutiveCheckins} Consecutive Pings</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        {/* Card 3: Trust Network (Purple & Magenta) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate('/trust-network')}
          className="glass-card p-5 border-l-4 border-l-purple-400 hover:border-purple-500/60 transition-all cursor-pointer group bg-gradient-to-br from-purple-950/20 via-slate-900/70 to-slate-900/90"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-purple-400/90 text-[11px] font-bold uppercase tracking-wider">TRUST NETWORK</span>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white">
            {verifiedContacts} / 3 Contacts Ready
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
            <span>2-of-3 Quorum Threshold</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        {/* Card 4: Emergency Protocol (Solar Amber & Crimson) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/emergency')}
          className={`glass-card p-5 border-l-4 ${
            emergencyMode ? 'border-l-red-500 glow-red' : 'border-l-amber-400'
          } hover:border-amber-500/60 transition-all cursor-pointer group bg-gradient-to-br from-amber-950/20 via-slate-900/70 to-slate-900/90`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-amber-400/90 text-[11px] font-bold uppercase tracking-wider">EMERGENCY PROTOCOL</span>
            <div className={`p-2 rounded-xl border group-hover:scale-110 transition-transform ${
              emergencyMode ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-xl font-black ${emergencyMode ? 'text-red-400' : 'text-white'}`}>
            {emergencyMode ? 'ACTIVE (IN PROGRESS)' : 'Armed (Standby)'}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
            <span>Automated Failover</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>
      </div>

      {/* Main Section: Score & Metrics + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Security Score & Sub-Pillars */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 bg-gradient-to-br from-slate-900/80 via-slate-900/90 to-[#0c1222] border-slate-800">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Legacy Protection Score Breakdown
            </h2>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
              Score: {securityScore.overall}%
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 py-2">
            <SecurityMeter score={securityScore.overall} />

            {/* 4 Colored Progress Pillars */}
            <div className="flex-1 space-y-4 w-full">
              {[
                { label: 'Vault Cryptographic Strength', val: securityScore.vaultSecurity, color: 'from-emerald-500 to-teal-400', badgeColor: 'text-emerald-400' },
                { label: 'Trust Network Redundancy', val: securityScore.trustNetwork, color: 'from-purple-500 to-fuchsia-400', badgeColor: 'text-purple-400' },
                { label: 'Heartbeat Reliability Index', val: securityScore.heartbeatReliability, color: 'from-rose-500 to-amber-400', badgeColor: 'text-rose-400' },
                { label: 'Emergency Recovery Readiness', val: securityScore.recoveryReadiness, color: 'from-cyan-500 to-blue-500', badgeColor: 'text-cyan-400' },
              ].map(m => (
                <div key={m.label} className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">{m.label}</span>
                    <span className={`font-mono font-bold ${m.badgeColor}`}>{m.val}%</span>
                  </div>
                  <div className="h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${m.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.val}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Trend Graph */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Security Events</span>
              <span className="text-xs text-cyan-400 font-mono">107 Total Verifications</span>
            </div>
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="cyberArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Area type="monotone" dataKey="events" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#cyberArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & Live Stream */}
        <div className="space-y-6">
          {/* Quick Interactive Actions */}
          <div className="glass-card p-6 border-slate-800 bg-slate-900/70">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
              <span>Quick Actions</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/vault')}
                className="p-3 bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 rounded-xl text-left transition-all hover:scale-[1.02] group"
              >
                <Eye className="w-4 h-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">View Vault</div>
                <div className="text-[10px] text-slate-400">18 files secured</div>
              </button>

              <button
                onClick={() => checkIn()}
                className="p-3 bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-500/30 hover:border-rose-400 rounded-xl text-left transition-all hover:scale-[1.02] group"
              >
                <Heart className="w-4 h-4 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Check In Now</div>
                <div className="text-[10px] text-slate-400">Reset heartbeat</div>
              </button>

              <button
                onClick={() => navigate('/drill')}
                className="p-3 bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-left transition-all hover:scale-[1.02] group"
              >
                <Power className="w-4 h-4 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Run Drill</div>
                <div className="text-[10px] text-slate-400">Test release flow</div>
              </button>

              <button
                onClick={() => navigate('/trust-network')}
                className="p-3 bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 hover:border-purple-400 rounded-xl text-left transition-all hover:scale-[1.02] group"
              >
                <Users className="w-4 h-4 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Trust Network</div>
                <div className="text-[10px] text-slate-400">3 keyholders</div>
              </button>
            </div>
          </div>

          {/* Real-time Audit Stream */}
          <div className="glass-card p-6 border-slate-800 bg-slate-900/70">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Live Security Activity</h3>
              <button 
                onClick={() => navigate('/audit')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                View Log <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {auditLog.slice(0, 4).map((entry) => {
                let dotColor = 'bg-cyan-400';
                if (entry.severity === 'critical') dotColor = 'bg-rose-500 shadow-[0_0_8px_#f43f5e]';
                if (entry.severity === 'warning') dotColor = 'bg-amber-400 shadow-[0_0_8px_#fbbf24]';

                return (
                  <div key={entry.id} className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/80 flex items-start gap-3 text-xs">
                    <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${dotColor}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-slate-200 font-bold text-[11px] truncate">
                          {entry.event}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0">
                          {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5 truncate">{entry.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Emergency Simulation Modal */}
      <AnimatePresence>
        {showEmergencyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card max-w-lg w-full p-8 border-red-500/50 bg-[#0d1224] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-purple-500 animate-pulse" />
              
              <div className="flex items-center space-x-3 text-red-400 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                  <AlertTriangle className="w-7 h-7 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Emergency Release Protocol</h2>
                  <p className="text-xs text-red-300">Automated multi-signature inheritance trigger</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {emergencySteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={i <= emergencyStep ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                      i < emergencyStep 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                        : i === emergencyStep 
                          ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' 
                          : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}>
                      {i < emergencyStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-xs font-semibold ${
                      i <= emergencyStep ? 'text-slate-100' : 'text-slate-600'
                    }`}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>

              {emergencyStep >= 6 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mb-6 p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-xl"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <div className="text-base font-bold text-emerald-300">DIGITAL LEGACY SECURED</div>
                  <div className="text-xs text-slate-300 mt-1">Authorized recovery package prepared for trusted nominees.</div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowEmergencyModal(false); navigate('/emergency'); }}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg"
                >
                  Inspect Emergency Center
                </button>
                <button
                  onClick={() => { setShowEmergencyModal(false); cancelEmergency(); }}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
