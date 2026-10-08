import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { Clock, Activity, AlertTriangle, ShieldCheck, Check, RotateCcw, Heart, Sparkles, Zap, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'May', checkIns: 4 },
  { name: 'Jun', checkIns: 4 },
  { name: 'Jul', checkIns: 5 },
  { name: 'Aug', checkIns: 4 },
  { name: 'Sep', checkIns: 4 },
  { name: 'Oct', checkIns: 6 },
];

export default function Heartbeat() {
  const heartbeat = useStore((s) => s.heartbeat);
  const setHeartbeatInterval = useStore((s) => s.setHeartbeatInterval);
  const checkIn = useStore((s) => s.checkIn);
  const simulateMissedHeartbeat = useStore((s) => s.simulateMissedHeartbeat);
  const completeDemoStep = useStore((s) => s.completeDemoStep);
  const emergencyMode = useStore((s) => s.app.emergencyMode);

  useEffect(() => {
    completeDemoStep(1);
    completeDemoStep(2);
  }, [completeDemoStep]);

  const isMissed = heartbeat.status === 'missed' || emergencyMode;
  const interval = heartbeat.interval || 30;

  const nextCheckInDays = isMissed ? 0 : Math.floor(interval * 0.8);
  const nextCheckInHours = isMissed ? 0 : 14;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-rose-950 text-rose-400 border border-rose-800/60 font-mono">
              PROOF-OF-LIFE MONITOR
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono">
              HEARTBEAT ENGINE v2.4
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Inactivity Heartbeat</h1>
          <p className="text-slate-400 text-sm mt-1">Autonomous cryptographic timer monitoring system for emergency release failover.</p>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 text-xs font-bold font-mono ${
          isMissed 
            ? 'bg-red-950/80 border-red-500/80 text-red-400 glow-red animate-pulse' 
            : 'bg-emerald-950/80 border-emerald-500/80 text-emerald-400 glow-green'
        }`}>
          <div className={`w-2.5 h-2.5 rounded-full ${isMissed ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
          <span>{isMissed ? '● HEARTBEAT MISSED' : '● HEARTBEAT HEALTHY'}</span>
        </div>
      </div>

      {/* Main Interactive Waveform Display */}
      <div className={`glass-card p-6 sm:p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden ${
        isMissed 
          ? 'border-red-500/60 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 shadow-2xl' 
          : 'border-slate-800 bg-gradient-to-br from-[#0c1329] via-[#090e1f] to-[#070a13]'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Configured Interval</span>
            <div className="text-2xl font-black text-white mt-0.5">Every {interval} Days</div>
          </div>

          <div className="text-center md:text-right">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Next Mandatory Check-In</span>
            <div className="text-3xl font-black font-mono mt-0.5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              {nextCheckInDays}d {nextCheckInHours}h Remaining
            </div>
          </div>
        </div>

        {/* Live SVG Waveform */}
        <div className="py-8 relative h-36 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-b border-slate-800 border-dashed" />
          </div>

          <motion.div 
            animate={{ x: [0, -600] }}
            transition={{ repeat: Infinity, duration: isMissed ? 1.5 : 4, ease: "linear" }}
            className="w-[1200px] h-full flex items-center absolute"
          >
            <svg viewBox="0 0 600 100" className={`w-[600px] h-28 ${isMissed ? 'text-red-500' : 'text-emerald-400'}`} fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M0,50 L100,50 L120,50 L135,15 L150,85 L165,50 L200,50 L300,50 L320,50 L335,15 L350,85 L365,50 L400,50 L500,50 L520,50 L535,15 L550,85 L565,50 L600,50" />
            </svg>
            <svg viewBox="0 0 600 100" className={`w-[600px] h-28 ${isMissed ? 'text-red-500' : 'text-emerald-400'}`} fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M0,50 L100,50 L120,50 L135,15 L150,85 L165,50 L200,50 L300,50 L320,50 L335,15 L350,85 L365,50 L400,50 L500,50 L520,50 L535,15 L550,85 L565,50 L600,50" />
            </svg>
          </motion.div>
        </div>

        {/* Interactive Check-In Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => checkIn()}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 text-slate-950 fill-slate-950" />
            Check In Now (Proof-of-Life)
          </button>

          <button
            onClick={() => simulateMissedHeartbeat()}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Simulate Missed Heartbeat
          </button>
        </div>
      </div>

      {/* Interval Selector and Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interval Selector */}
        <div className="glass-card p-6 border-slate-800 bg-slate-900/70 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            Select Heartbeat Interval
          </h3>
          <p className="text-xs text-slate-400">
            Define how often you must authenticate before the emergency grace period is activated.
          </p>

          <div className="grid grid-cols-5 gap-2 pt-2">
            {[7, 14, 30, 60, 90].map((days) => (
              <button
                key={days}
                onClick={() => setHeartbeatInterval(days)}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
                  interval === days
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/70 shadow-lg glow-cyan'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="text-base font-black font-mono">{days}</div>
                <div className="text-[10px] text-slate-400">Days</div>
              </button>
            ))}
          </div>

          <div className="p-3 bg-amber-950/20 border border-amber-700/30 rounded-xl text-xs text-amber-300/90 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Recommended for regular users: <strong>30 Days</strong> with a 24-hour multi-channel grace period alert.</span>
          </div>
        </div>

        {/* Check-in History Graph */}
        <div className="glass-card p-6 border-slate-800 bg-slate-900/70 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Check-In Consistency History
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">100% On-Time</span>
          </div>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="heartbeatArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#34d399' }}
                />
                <Area type="monotone" dataKey="checkIns" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#heartbeatArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
