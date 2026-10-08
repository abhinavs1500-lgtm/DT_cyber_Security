import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AuditEntry } from '../types';

const categories = ['All', 'Authentication', 'Vault', 'Heartbeat', 'Emergency', 'Trust Network', 'Security'];

export default function AuditLog() {
  const auditLog = useStore((s) => s.auditLog);
  const completeDemoStep = useStore((s) => s.completeDemoStep);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    completeDemoStep(8);
  }, [completeDemoStep]);

  const filteredLogs = auditLog.filter((log: AuditEntry) => {
    const categoryName = log.category.replace('_', ' ').toLowerCase();
    const matchesFilter = filter === 'All' || categoryName === filter.toLowerCase();
    const matchesSearch = log.event.toLowerCase().includes(search.toLowerCase()) || 
                          (log.details || '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a: AuditEntry, b: AuditEntry) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-cyan-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
            Security Audit Trail
          </h1>
          <p className="text-slate-400 mt-2">Immutable record of all system events and access attempts.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Total Events</p>
          <p className="text-2xl font-mono text-cyan-400">{auditLog.length}</p>
        </div>
      </header>

      <div className="glass-card p-4 border border-slate-700/50 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === cat ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredLogs.length > 0 ? filteredLogs.map((log: AuditEntry, index: number) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: Math.min(index * 0.05, 0.5) }}
              className="glass-card p-4 border border-slate-700/50 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex-shrink-0 text-slate-400 text-xs font-mono w-40">
                {new Date(log.timestamp).toLocaleString(undefined, { 
                  year: 'numeric', month: 'short', day: 'numeric',
                  hour: '2-digit', minute:'2-digit', second:'2-digit'
                })}
              </div>
              
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getSeverityColor(log.severity)}`} />
                <div>
                  <p className="text-sm font-mono text-cyan-400 mb-0.5">{log.event}</p>
                  <p className="text-sm text-slate-300 truncate">{log.details}</p>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <span className="px-2.5 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700 uppercase">
                  {log.category.replace('_', ' ')}
                </span>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-12 text-slate-500">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No audit logs found matching criteria.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
