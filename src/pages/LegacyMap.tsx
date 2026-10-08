import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FileText, Database, Users, Key, ChevronRight, Network } from 'lucide-react';
import { useStore } from '../store/useStore';

const LegacyMap = () => {
  const store = useStore();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: 'user', label: 'USER', icon: User, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', x: 50, y: 50, radius: 40 },
    { id: 'memories', label: 'Memories', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', x: 20, y: 20, radius: 30, items: 124 },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', x: 80, y: 20, radius: 30, items: 45 },
    { id: 'recovery', label: 'Recovery', icon: Key, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', x: 15, y: 80, radius: 30, items: 8 },
    { id: 'assets', label: 'Assets', icon: Database, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', x: 85, y: 80, radius: 30, items: 3 },
    { id: 'contacts', label: 'Contacts', icon: Users, color: 'text-violet-400', bg: 'bg-violet-500/20', border: 'border-violet-500/30', x: 50, y: 90, radius: 35, items: 3 },
  ];

  const subNodes = [
    { id: 'c1', label: 'Contact 1', x: 35, y: 110, parent: 'contacts' },
    { id: 'c2', label: 'Contact 2', x: 50, y: 115, parent: 'contacts' },
    { id: 'c3', label: 'Contact 3', x: 65, y: 110, parent: 'contacts' }
  ];

  const edges = [
    { source: 'user', target: 'memories' },
    { source: 'user', target: 'documents' },
    { source: 'user', target: 'recovery' },
    { source: 'user', target: 'assets' },
    { source: 'user', target: 'contacts' },
    { source: 'contacts', target: 'c1', isSub: true },
    { source: 'contacts', target: 'c2', isSub: true },
    { source: 'contacts', target: 'c3', isSub: true },
  ];

  const activeNodeData = nodes.find(n => n.id === activeNode);

  return (
    <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Network className="w-8 h-8 text-cyan-400" />
          Digital Legacy Map
        </h1>
        <p className="text-slate-400">Interactive visualization of your encrypted digital estate and trust network.</p>
      </div>

      <div className="flex-1 relative glass-card overflow-hidden flex">
        <div className="flex-1 relative">
          <svg className="absolute inset-0 w-full h-full" style={{ minHeight: '600px' }}>
            <defs>
              <linearGradient id="line-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="line-grad-sub" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {edges.map((edge, i) => {
              const source = nodes.find(n => n.id === edge.source) || subNodes.find(n => n.id === edge.source);
              const target = nodes.find(n => n.id === edge.target) || subNodes.find(n => n.id === edge.target);
              if (!source || !target) return null;

              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={`${source.x}%`} y1={`${source.y}%`}
                  x2={`${target.x}%`} y2={`${target.y}%`}
                  stroke={edge.isSub ? "url(#line-grad-sub)" : "url(#line-grad-main)"}
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const Icon = node.icon;
            const isActive = activeNode === node.id;
            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center justify-center cursor-pointer -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveNode(isActive ? null : node.id)}
              >
                <div className={`rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-all duration-300 ${node.bg} ${node.border} ${isActive ? 'ring-4 ring-white/20' : ''}`}
                     style={{ width: node.radius * 2, height: node.radius * 2 }}>
                  <Icon className={`w-8 h-8 ${node.color}`} />
                </div>
                <div className="mt-2 text-sm font-mono font-semibold text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
                  {node.label}
                </div>
              </motion.div>
            );
          })}

          {subNodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-violet-500/30 bg-violet-500/10 backdrop-blur-md">
                <User className="w-5 h-5 text-violet-400" />
              </div>
              <div className="mt-1 text-xs text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-white/5">
                {node.label}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeNodeData && activeNodeData.id !== 'user' && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 border-l border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 h-full absolute right-0 top-0"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${activeNodeData.bg} ${activeNodeData.border} border`}>
                  <activeNodeData.icon className={`w-6 h-6 ${activeNodeData.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{activeNodeData.label}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                  <div className="text-xs text-slate-400 mb-1 font-mono uppercase">Status</div>
                  <div className="text-emerald-400 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Encrypted & Secured
                  </div>
                </div>
                
                {activeNodeData.items !== undefined && (
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                    <div className="text-xs text-slate-400 mb-1 font-mono uppercase">Items</div>
                    <div className="text-2xl font-bold text-white">{activeNodeData.items}</div>
                  </div>
                )}
                
                <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center justify-between mt-4 text-slate-300">
                  Manage {activeNodeData.label}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LegacyMap;
