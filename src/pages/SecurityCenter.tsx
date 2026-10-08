import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, Users, AlertTriangle, Database, Activity, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AuditEntry, ThreatEvent } from '../types';

export default function SecurityCenter() {
  const threats = useStore((s) => s.threats);
  const resolveThreat = useStore((s) => s.resolveThreat);
  const auditLog = useStore((s) => s.auditLog);
  const securityScore = useStore((s) => s.securityScore);

  const securityStatus = [
    { title: 'Zero-Trust Architecture', status: 'Enabled', active: true, icon: Shield },
    { title: 'Encryption', status: 'Simulated AES-256', active: true, icon: Lock },
    { title: 'Multi-Factor Auth', status: 'Enabled', active: true, icon: Key },
    { title: 'Trusted Contact Verif.', status: 'Complete', active: true, icon: Users },
    { title: 'Emergency Protocol', status: 'Armed', active: true, icon: AlertTriangle, amber: true },
    { title: 'Vault Integrity', status: '100%', active: true, icon: Database }
  ];

  const securityLog = auditLog.filter((log: AuditEntry) => log.category === 'security').slice(0, 10);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Security Center
        </h1>
        <p className="text-slate-400 mt-2">Monitor and manage your cryptographic defense systems.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityStatus.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-4 border border-slate-700/50 flex items-center gap-4"
            >
              <div className={`p-3 rounded-lg ${item.amber ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm text-slate-400 font-medium">{item.title}</h3>
                <p className={`text-lg font-semibold ${item.amber ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {item.status}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-6 border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Active Threats & Suspicious Activity
            </h2>
            
            {threats.filter((t: ThreatEvent) => !t.resolved).length === 0 ? (
              <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg flex items-center gap-3 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <p>No suspicious activity detected. Systems normal.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {threats.filter((t: ThreatEvent) => !t.resolved).map((threat: ThreatEvent) => (
                  <div key={threat.id} className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-red-400 font-medium">{threat.type}</p>
                        <p className="text-xs text-red-400/70">{new Date(threat.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => resolveThreat(threat.id)}
                      className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-sm transition-colors"
                    >
                      Resolve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card p-6 border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Legacy Protection Score</h2>
            <div className="flex items-center gap-8 mb-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#1e293b" strokeWidth="12" />
                  <motion.circle 
                    cx="64" cy="64" r="56" fill="none" stroke="#10b981" strokeWidth="12"
                    strokeDasharray="351.8" strokeDashoffset={351.8 * (1 - securityScore.overall / 100)}
                    initial={{ strokeDashoffset: 351.8 }}
                    animate={{ strokeDashoffset: 351.8 * (1 - securityScore.overall / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-white">{securityScore.overall}%</span>
                  <span className="text-xs text-slate-400">Excellent</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Vault Security</span>
                    <span className="text-emerald-400">{securityScore.vaultSecurity}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${securityScore.vaultSecurity}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Trust Network</span>
                    <span className="text-violet-400">{securityScore.trustNetwork}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500" style={{ width: `${securityScore.trustNetwork}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Recovery Readiness</span>
                    <span className="text-amber-400">{securityScore.recoveryReadiness}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${securityScore.recoveryReadiness}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Recommendations</h2>
            <ul className="space-y-3">
              <li className="p-3 bg-slate-800/50 rounded border border-slate-700 flex gap-3">
                <div className="mt-1"><AlertTriangle className="w-4 h-4 text-amber-400" /></div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Add more Trusted Contacts</p>
                  <p className="text-xs text-slate-400 mt-1">You currently have 3 contacts. We recommend maintaining active verifications.</p>
                </div>
              </li>
              <li className="p-3 bg-slate-800/50 rounded border border-slate-700 flex gap-3">
                <div className="mt-1"><Key className="w-4 h-4 text-cyan-400" /></div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Rotate Recovery Keys</p>
                  <p className="text-xs text-slate-400 mt-1">Your backup recovery keys are verified. Periodic testing ensures readiness.</p>
                </div>
              </li>
              <li className="p-3 bg-slate-800/50 rounded border border-slate-700 flex gap-3">
                <div className="mt-1"><Shield className="w-4 h-4 text-emerald-400" /></div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Run Recovery Drill</p>
                  <p className="text-xs text-slate-400 mt-1">Test your multi-signature release sequence without exposing data.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Security Event Log</h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {securityLog.length > 0 ? securityLog.map((log: AuditEntry) => (
                <div key={log.id} className="p-3 bg-slate-800/30 rounded border border-slate-700/50">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono text-cyan-400">{log.event}</span>
                    <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-300">{log.details}</p>
                </div>
              )) : (
                 <p className="text-sm text-slate-400 text-center py-4">No recent security events.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
