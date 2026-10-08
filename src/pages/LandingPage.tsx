import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Camera, FileText, Key, Database, Coins, Activity, Users, Lock, AlertTriangle, ArrowRight, Sparkles, CheckCircle2, Heart, RefreshCw, Cpu, Layers } from 'lucide-react';
import { useStore } from '../store/useStore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);

  const handleDemo = () => {
    login(true);
    navigate('/dashboard');
  };

  const problemCards = [
    { title: 'Device Loss', desc: 'Critical credentials and 2FA recovery seeds become permanently inaccessible upon device failure.', icon: Lock, color: 'from-cyan-500 to-blue-600', border: 'border-cyan-500/30' },
    { title: 'Account Lockout', desc: 'Single-point recovery flows fail when primary verification factors are compromised.', icon: AlertTriangle, color: 'from-amber-500 to-orange-600', border: 'border-amber-500/30' },
    { title: 'Emergency Failover', desc: 'Families and executors struggle to locate critical health, property, and asset records in emergencies.', icon: Heart, color: 'from-rose-500 to-pink-600', border: 'border-rose-500/30' },
    { title: 'Trapped Digital Assets', desc: 'Decades of photos, intellectual property, and portfolios remain trapped in encrypted accounts.', icon: Coins, color: 'from-purple-500 to-fuchsia-600', border: 'border-purple-500/30' },
  ];

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 particle-bg circuit-pattern opacity-60 pointer-events-none" />

      {/* Navigation Header */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12 border-b border-slate-800/80 bg-[#0a0f1d]/80 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-purple-600 p-0.5 glow-cyan shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Key className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-black text-base tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-purple-300">
              DEAD-MAN'S DIGITAL KEY
            </span>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">ZERO-TRUST HERITAGE</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM SECURE</span>
          </div>

          <Link to="/auth" className="text-xs font-bold text-slate-300 hover:text-cyan-400 px-3 py-2 transition-colors">
            Login
          </Link>

          <button 
            onClick={handleDemo}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.03] flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            ENTER DEMO MODE
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center">
        <section className="w-full max-w-7xl px-6 md:px-12 pt-16 pb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold mb-6 glow-cyan"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>NEXT-GEN CYBERSECURITY PROTOTYPE</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6"
          >
            <span className="block text-white">DEAD-MAN'S</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              DIGITAL KEY
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg sm:text-2xl text-slate-300 mb-4 max-w-3xl font-light leading-relaxed"
          >
            "Your digital legacy. Released only when it should be."
          </motion.p>

          <p className="text-sm text-slate-400 max-w-2xl mb-10 leading-relaxed">
            A zero-trust emergency digital inheritance platform designed to protect your most critical credentials, documents, and memories when you can no longer access them.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
          >
            <button 
              onClick={handleDemo}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-slate-950 font-black rounded-2xl text-sm transition-all shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Key className="w-5 h-5 text-slate-950" />
              Create Secure Vault (Demo)
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link 
              to="/auth"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl text-sm border border-slate-700 transition-all hover:border-slate-500 flex items-center justify-center"
            >
              Explore Architecture
            </Link>
          </motion.div>

          {/* Central Animated Vault Diagram */}
          <div className="w-full max-w-4xl relative mb-24">
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0c1224] to-[#070b18] shadow-2xl relative overflow-hidden">
              <div className="text-center mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  AUTONOMOUS ZERO-TRUST RECOVERY PIPELINE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Multi-Signature Inheritance Topology</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-cyan-500/40 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">1</div>
                  <div className="text-xs font-bold text-white">USER</div>
                  <div className="text-[10px] text-slate-400">Vault Owner</div>
                </div>

                <div className="text-cyan-400 font-bold text-xs">↓ Heartbeat</div>

                <div className="p-4 bg-slate-900/90 rounded-2xl border border-rose-500/40 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">2</div>
                  <div className="text-xs font-bold text-white">HEARTBEAT</div>
                  <div className="text-[10px] text-slate-400">Inactivity Check</div>
                </div>

                <div className="text-purple-400 font-bold text-xs">↓ Quorum</div>

                <div className="p-4 bg-slate-900/90 rounded-2xl border border-purple-500/40 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">3</div>
                  <div className="text-xs font-bold text-white">TRUST NETWORK</div>
                  <div className="text-[10px] text-slate-400">2 of 3 Approval</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap justify-center gap-4 text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Photos & Memorabilia</span>
                <span className="text-cyan-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Legal Documents</span>
                <span className="text-purple-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> 2FA Recovery Codes</span>
                <span className="text-amber-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Digital Assets</span>
              </div>
            </div>
          </div>

          {/* Real-World Problem Section */}
          <section className="w-full max-w-6xl text-left space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-black text-white">Why This Matters</h2>
              <p className="text-sm text-slate-400 mt-2">
                Every year, billions in digital assets and irreplaceable memories are permanently lost due to sudden unavailability and account lockouts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {problemCards.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className={`p-6 glass-card border ${p.border} rounded-2xl bg-slate-900/70 hover:scale-[1.02] transition-all`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${p.color} p-0.5 mb-4 shadow-lg`}>
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
