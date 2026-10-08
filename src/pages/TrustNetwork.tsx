import React from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, AlertOctagon, Mail, Lock, Unlock, Users, Key, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function TrustNetwork() {
  const contacts = useStore((s) => s.contacts);
  const emergencyMode = useStore((s) => s.app.emergencyMode);
  const panicLock = useStore((s) => s.app.panicLock);
  const approveContact = useStore((s) => s.approveContact);
  const setContactAvailability = useStore((s) => s.setContactAvailability);
  const triggerEmergency = useStore((s) => s.triggerEmergency);

  const approvedCount = contacts.filter((c) => c.approvalStatus === 'approved').length;
  const isAuthorized = approvedCount >= 2;
  const availableCount = contacts.filter((c) => c.available !== false).length;
  const isQuorumPossible = availableCount >= 2;

  const nodeThemes = [
    { color: 'border-emerald-500 text-emerald-400 bg-emerald-950/40', glow: 'glow-green', line: '#10b981', badge: 'bg-emerald-950 text-emerald-400 border-emerald-800' },
    { color: 'border-cyan-500 text-cyan-400 bg-cyan-950/40', glow: 'glow-cyan', line: '#06b6d4', badge: 'bg-cyan-950 text-cyan-400 border-cyan-800' },
    { color: 'border-purple-500 text-purple-400 bg-purple-950/40', glow: 'glow-violet', line: '#a855f7', badge: 'bg-purple-950 text-purple-400 border-purple-800' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Panic Lock Overlay */}
      {panicLock && (
        <div className="p-4 bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-500/50 rounded-2xl flex items-center gap-3 text-blue-200">
          <Lock className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="font-bold text-sm">TRUST NETWORK FROZEN — System panic lock is active. No signatures can be signed.</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-purple-950 text-purple-400 border border-purple-800/60 font-mono">
              MULTI-SIGNATURE PROTOCOL
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono">
              2 OF 3 QUORUM
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Multi-Signature Trust Network</h1>
          <p className="text-slate-400 text-sm mt-1">
            Decentralized social recovery consensus. No single person holds complete vault access.
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-3">
          {!emergencyMode && (
            <button
              onClick={triggerEmergency}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Enable Emergency Mode to Test
            </button>
          )}
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs">
            Approvals: <strong className="text-cyan-400">{approvedCount} / 2</strong> Required
          </div>
        </div>
      </div>

      {/* Central Visual Multi-Sig Graph */}
      <div className="relative h-[420px] w-full glass-card bg-gradient-to-b from-[#0b1021] via-[#0d142b] to-[#080d1a] rounded-3xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-2xl">
        {/* SVG Network Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {/* Line 1 to Sarah (Top Left) */}
          <line 
            x1="50%" y1="50%" x2="22%" y2="30%" 
            stroke={contacts[0]?.approvalStatus === 'approved' ? '#10b981' : emergencyMode ? '#06b6d4' : '#334155'} 
            strokeWidth="3" 
            strokeDasharray={contacts[0]?.approvalStatus === 'approved' ? '' : '6,6'} 
            className="transition-all duration-700" 
          />
          {/* Line 2 to Rahul (Top Right) */}
          <line 
            x1="50%" y1="50%" x2="78%" y2="30%" 
            stroke={contacts[1]?.approvalStatus === 'approved' ? '#06b6d4' : emergencyMode ? '#a855f7' : '#334155'} 
            strokeWidth="3" 
            strokeDasharray={contacts[1]?.approvalStatus === 'approved' ? '' : '6,6'} 
            className="transition-all duration-700" 
          />
          {/* Line 3 to Ananya (Bottom Center) */}
          <line 
            x1="50%" y1="50%" x2="50%" y2="82%" 
            stroke={contacts[2]?.approvalStatus === 'approved' ? '#a855f7' : emergencyMode ? '#ec4899' : '#334155'} 
            strokeWidth="3" 
            strokeDasharray={contacts[2]?.approvalStatus === 'approved' ? '' : '6,6'} 
            className="transition-all duration-700" 
          />
        </svg>

        {/* Central Vault Node */}
        <motion.div 
          className={`absolute z-10 w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl bg-[#0d1326] transition-all duration-500 ${
            isAuthorized 
              ? 'border-emerald-400 glow-green' 
              : emergencyMode 
                ? 'border-cyan-400 glow-cyan' 
                : 'border-slate-700'
          }`}
          animate={isAuthorized ? { scale: [1, 1.04, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {isAuthorized ? (
            <Unlock className="w-8 h-8 text-emerald-400 mb-1 animate-bounce" />
          ) : (
            <Lock className={`w-8 h-8 ${emergencyMode ? 'text-cyan-400 animate-pulse' : 'text-slate-500'} mb-1`} />
          )}
          <span className="text-xs font-black tracking-wider text-white">
            {isAuthorized ? 'AUTHORIZED' : 'VAULT CORE'}
          </span>
          <span className="text-[10px] font-mono text-cyan-400">
            {approvedCount} / 2 Keys
          </span>
        </motion.div>

        {/* Node 1: Sarah Mitchell (Top Left) */}
        <div className="absolute top-[14%] left-[12%] sm:left-[16%] flex flex-col items-center">
          <motion.div 
            whileHover={{ scale: 1.08 }}
            className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center shadow-xl ${
              contacts[0]?.approvalStatus === 'approved' 
                ? 'border-emerald-400 bg-emerald-950/80 glow-green' 
                : 'border-emerald-500/50 bg-slate-900/90 text-emerald-400'
            }`}
          >
            <div className="text-center">
              <div className="font-black text-sm text-emerald-300">SM</div>
              <div className="text-[9px] font-mono text-slate-400">96% Trust</div>
            </div>
          </motion.div>
          <span className="text-xs font-bold text-white mt-2">Sarah Mitchell</span>
          <span className="text-[10px] text-emerald-400 font-mono">Family (Verified)</span>
        </div>

        {/* Node 2: Rahul Sharma (Top Right) */}
        <div className="absolute top-[14%] right-[12%] sm:right-[16%] flex flex-col items-center">
          <motion.div 
            whileHover={{ scale: 1.08 }}
            className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center shadow-xl ${
              contacts[1]?.approvalStatus === 'approved' 
                ? 'border-cyan-400 bg-cyan-950/80 glow-cyan' 
                : 'border-cyan-500/50 bg-slate-900/90 text-cyan-400'
            }`}
          >
            <div className="text-center">
              <div className="font-black text-sm text-cyan-300">RS</div>
              <div className="text-[9px] font-mono text-slate-400">91% Trust</div>
            </div>
          </motion.div>
          <span className="text-xs font-bold text-white mt-2">Rahul Sharma</span>
          <span className="text-[10px] text-cyan-400 font-mono">Trusted Friend</span>
        </div>

        {/* Node 3: Ananya Patel (Bottom Center) */}
        <div className="absolute bottom-[8%] flex flex-col items-center">
          <motion.div 
            whileHover={{ scale: 1.08 }}
            className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center shadow-xl ${
              contacts[2]?.approvalStatus === 'approved' 
                ? 'border-purple-400 bg-purple-950/80 glow-violet' 
                : 'border-purple-500/50 bg-slate-900/90 text-purple-400'
            }`}
          >
            <div className="text-center">
              <div className="font-black text-sm text-purple-300">AP</div>
              <div className="text-[9px] font-mono text-slate-400">98% Trust</div>
            </div>
          </motion.div>
          <span className="text-xs font-bold text-white mt-2">Ananya Patel</span>
          <span className="text-[10px] text-purple-400 font-mono">Family (Verified)</span>
        </div>
      </div>

      {/* Threshold Status Callout */}
      {isAuthorized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-gradient-to-r from-emerald-950/90 via-teal-900/80 to-emerald-950/90 border border-emerald-500/50 rounded-2xl flex items-center justify-between shadow-xl glow-green"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <div>
              <h3 className="font-bold text-white text-base">2 / 3 APPROVALS RECEIVED — RELEASE AUTHORIZED</h3>
              <p className="text-xs text-emerald-300">Emergency multi-signature threshold satisfied. Authorized recovery package ready.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-900 text-emerald-300 text-xs font-mono font-bold rounded-lg border border-emerald-700">
            QUORUM MET ✓
          </span>
        </motion.div>
      )}

      {!isQuorumPossible && (
        <div className="p-4 bg-red-950/80 border border-red-500/50 rounded-2xl flex items-center gap-3 text-red-200">
          <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-white">Emergency Release Blocked</h4>
            <p className="text-xs text-red-300">Multiple trusted contacts are unavailable. Multi-signature threshold (2 of 3) cannot be satisfied.</p>
          </div>
        </div>
      )}

      {/* Contact Cards & Interactive Approval Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map((contact, idx) => {
          const theme = nodeThemes[idx % nodeThemes.length];
          const isApproved = contact.approvalStatus === 'approved';
          const isAvailable = contact.available !== false;

          return (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card p-6 border-l-4 rounded-2xl flex flex-col justify-between space-y-6 bg-slate-900/70 ${theme.color}`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-base shadow-md">
                      {contact.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{contact.name}</h3>
                      <p className="text-xs text-slate-400">{contact.relationship}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${theme.badge}`}>
                    {contact.trustScore}% TRUST
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <div className="flex justify-between">
                    <span>Verification:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> ID Confirmed
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span className="text-slate-300 font-mono">{contact.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability:</span>
                    <span className={isAvailable ? 'text-cyan-400' : 'text-rose-400'}>
                      {isAvailable ? 'Online & Active' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => approveContact(contact.id)}
                  disabled={isApproved || !emergencyMode || !isAvailable || panicLock}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                    isApproved
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : emergencyMode && isAvailable && !panicLock
                        ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 hover:scale-[1.02]'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  {isApproved ? (
                    <>
                      <Check className="w-4 h-4" />
                      Approval Confirmed
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      {emergencyMode ? 'Approve Release (Demo)' : 'Awaiting Emergency Trigger'}
                    </>
                  )}
                </button>

                <button
                  onClick={() => setContactAvailability(contact.id, !isAvailable)}
                  className="w-full py-1.5 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[11px] rounded-lg border border-slate-800 transition-colors"
                >
                  Toggle Availability: {isAvailable ? 'Simulate Offline' : 'Restore Online'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
