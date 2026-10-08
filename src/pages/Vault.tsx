import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Camera, FileText, Key, LifeBuoy, Folder, Coins, CheckCircle, Upload, Shield, Lock, List, Grid, ShieldCheck, Sparkles, Binary } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VaultItem } from '../types';

const CATEGORIES = [
  { id: 'photos', name: 'Photos', icon: Camera, color: 'text-rose-400', bg: 'bg-rose-950/30 border-rose-500/30', bar: 'from-rose-500 to-pink-500' },
  { id: 'documents', name: 'Documents', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-950/30 border-cyan-500/30', bar: 'from-cyan-500 to-blue-500' },
  { id: 'credentials', name: 'Credentials', icon: Key, color: 'text-emerald-400', bg: 'bg-emerald-950/30 border-emerald-500/30', bar: 'from-emerald-500 to-teal-400' },
  { id: 'recovery', name: 'Recovery Information', icon: LifeBuoy, color: 'text-purple-400', bg: 'bg-purple-950/30 border-purple-500/30', bar: 'from-purple-500 to-fuchsia-400' },
  { id: 'files', name: 'Important Files', icon: Folder, color: 'text-amber-400', bg: 'bg-amber-950/30 border-amber-500/30', bar: 'from-amber-500 to-orange-500' },
  { id: 'assets', name: 'Digital Assets', icon: Coins, color: 'text-violet-400', bg: 'bg-violet-950/30 border-violet-500/30', bar: 'from-violet-500 to-indigo-500' },
];

export default function Vault() {
  const vaultItems = useStore((s) => s.vaultItems);
  const panicLock = useStore((s) => s.app.panicLock);
  const addVaultItem = useStore((s) => s.addVaultItem);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'encrypting' | 'stored'>('idle');
  const [progress, setProgress] = useState(0);

  const totalItems = vaultItems.length;
  const encryptedCount = vaultItems.filter((i) => i.encrypted).length || totalItems;

  const simulateUpload = () => {
    setUploadState('uploading');
    setProgress(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      setProgress(Math.min(current, 100));
      if (current >= 100) {
        clearInterval(interval);
        setUploadState('encrypting');
        setTimeout(() => {
          setUploadState('stored');
          addVaultItem({
            name: `Emergency_Encrypted_Backup_${Math.floor(Math.random() * 9000 + 1000)}.enc`,
            category: 'recovery',
            size: '1.8 MB',
            accessLevel: 'emergency'
          });
          setTimeout(() => setUploadState('idle'), 2500);
        }, 1200);
      }
    }, 120);
  };

  const filteredItems = selectedCategory === 'all' 
    ? vaultItems 
    : vaultItems.filter(i => i.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Panic Lock Warning */}
      {panicLock && (
        <div className="p-4 bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-500/50 rounded-2xl flex items-center gap-3 text-blue-200">
          <Lock className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="font-bold text-sm">VAULT FROZEN — Emergency lock is enabled. All operations read-only.</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono">
              AES-256-GCM
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono">
              100% INTEGRITY
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Encrypted Digital Vault</h1>
          <p className="text-slate-400 text-sm mt-1">Zero-knowledge simulated storage for critical recovery payloads.</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={simulateUpload}
            disabled={uploadState !== 'idle' || panicLock}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg hover:scale-[1.02] flex items-center gap-2 disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            Secure Upload Demo
          </button>
        </div>
      </div>

      {/* Simulated Uploading Pipeline Modal / Bar */}
      <AnimatePresence>
        {uploadState !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 glass-card border border-cyan-500/40 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                  <Binary className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {uploadState === 'uploading' && 'Streaming demo payload to secure enclave...'}
                    {uploadState === 'encrypting' && 'Applying simulated AES-256-GCM encryption cipher...'}
                    {uploadState === 'stored' && '✓ Payload encrypted and committed to zero-trust vault!'}
                  </h4>
                  <p className="text-xs text-cyan-300 font-mono mt-0.5">
                    SHA256: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-lg border border-cyan-800">
                {uploadState === 'uploading' ? `${progress}%` : uploadState === 'encrypting' ? 'ENCRYPTING' : 'SECURED'}
              </span>
            </div>

            <div className="h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: uploadState === 'stored' ? '100%' : `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const itemsInCat = vaultItems.filter(i => i.category === cat.id);
          const isSelected = selectedCategory === cat.id;

          return (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
              className={`p-5 glass-card border transition-all cursor-pointer rounded-2xl relative overflow-hidden ${
                isSelected 
                  ? 'border-cyan-400 shadow-xl bg-slate-900/90' 
                  : `${cat.bg} hover:border-slate-600`
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-slate-900/80 border border-white/5 ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 font-bold">
                  {itemsInCat.length} items
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{cat.name}</h3>
              <p className="text-xs text-slate-400 mb-3">AES-256 simulated encryption</p>

              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${cat.bar}`} style={{ width: '100%' }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all' 
                ? 'bg-cyan-500 text-slate-950 font-bold' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Items ({totalItems})
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c.id 
                  ? 'bg-cyan-500 text-slate-950 font-bold' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Vault Items List/Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 glass-card border border-slate-800/80 hover:border-slate-700 bg-slate-900/60 rounded-xl space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white truncate max-w-[180px]">{item.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{item.size} • {item.category}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  ENCRYPTED
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/50">
                <span>Access: <strong className="text-slate-300 capitalize">{item.accessLevel}</strong></span>
                <span className="text-slate-500 font-mono">{item.lastUpdated}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card overflow-hidden border border-slate-800/80 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Asset Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Size</th>
                <th className="p-3.5">Encryption Status</th>
                <th className="p-3.5">Access Scope</th>
                <th className="p-3.5">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    {item.name}
                  </td>
                  <td className="p-3.5 text-slate-300 capitalize">{item.category}</td>
                  <td className="p-3.5 text-slate-400 font-mono">{item.size}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                      AES-256 ✓
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300 capitalize">{item.accessLevel}</td>
                  <td className="p-3.5 text-slate-500 font-mono">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
