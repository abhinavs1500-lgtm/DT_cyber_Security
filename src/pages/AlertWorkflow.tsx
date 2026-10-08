import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Bell, Clock, Users, ShieldCheck, Unlock, ArrowDown, Settings } from 'lucide-react';

const AlertWorkflow = () => {
  const [waitPeriod, setWaitPeriod] = useState('24h');
  const [threshold, setThreshold] = useState('2/3');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const nodes = [
    { id: 1, type: 'trigger', icon: Activity, label: 'HEARTBEAT MISSED', color: 'border-red-500', text: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 2, type: 'action', icon: Bell, label: 'SEND USER ALERT', color: 'border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 3, type: 'wait', icon: Clock, label: 'WAIT FOR RESPONSE', color: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10', hasConfig: true, configType: 'wait' },
    { id: 4, type: 'action', icon: Bell, label: 'SEND SECOND ALERT', color: 'border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 5, type: 'notify', icon: Users, label: 'NOTIFY CONTACT #1', color: 'border-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
    { id: 6, type: 'notify', icon: Users, label: 'NOTIFY CONTACT #2', color: 'border-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
    { id: 7, type: 'notify', icon: Users, label: 'NOTIFY CONTACT #3', color: 'border-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
    { id: 8, type: 'approval', icon: ShieldCheck, label: 'APPROVAL REQUIRED', color: 'border-green-500', text: 'text-green-400', bg: 'bg-green-500/10', hasConfig: true, configType: 'threshold' },
    { id: 9, type: 'release', icon: Unlock, label: 'AUTHORIZE RELEASE', color: 'border-green-500', text: 'text-green-400', bg: 'bg-green-500/10' }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-cyan-400" />
            Alert Workflow Builder
          </h1>
          <p className="text-slate-400">Configure the sequence of events triggered by a missed heartbeat.</p>
        </div>
      </div>

      <motion.div 
        className="flex flex-col items-center pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isLast = index === nodes.length - 1;

          return (
            <React.Fragment key={node.id}>
              <motion.div variants={itemVariants} className="w-full max-w-md relative z-10">
                <div className={`glass-card p-6 border-l-4 ${node.color} flex items-center gap-4 relative overflow-hidden group`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 ${node.bg} rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:blur-3xl transition-all duration-500`} />
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${node.bg} border border-white/5`}>
                    <Icon className={`w-6 h-6 ${node.text}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-mono text-sm tracking-widest text-slate-300 font-semibold">{node.label}</h3>
                    {node.hasConfig && node.configType === 'wait' && (
                      <div className="mt-2 flex gap-2">
                        {['12h', '24h', '48h', '72h'].map(t => (
                          <button
                            key={t}
                            onClick={() => setWaitPeriod(t)}
                            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                              waitPeriod === t ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800/50 text-slate-400 border border-transparent hover:border-slate-700'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                    {node.hasConfig && node.configType === 'threshold' && (
                      <div className="mt-2 flex gap-2">
                        {['1/3', '2/3', '3/3'].map(t => (
                          <button
                            key={t}
                            onClick={() => setThreshold(t)}
                            className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                              threshold === t ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-800/50 text-slate-400 border border-transparent hover:border-slate-700'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {!isLast && (
                <motion.div variants={itemVariants} className="h-16 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex justify-center">
                    <div className="w-px h-full bg-gradient-to-b from-slate-700 to-transparent relative overflow-hidden">
                      <motion.div
                        className="w-full h-1/2 bg-cyan-400/50"
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                    </div>
                  </div>
                  <ArrowDown className="w-5 h-5 text-slate-600 relative z-10 bg-[#0A0E17]" />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AlertWorkflow;
