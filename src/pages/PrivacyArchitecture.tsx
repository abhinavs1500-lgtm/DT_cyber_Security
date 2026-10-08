import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Lock, Users, Key, Unlock, ChevronDown, Activity, ArrowDown } from 'lucide-react';

const PrivacyArchitecture = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const layers = [
    { id: 1, icon: User, title: 'USER', desc: 'Owner of the digital legacy', color: 'text-green-400', border: 'border-green-500', bg: 'bg-green-500/10', details: 'The central authority. Only the user can create, update, or delete the encrypted data.' },
    { id: 2, icon: Shield, title: 'ENCRYPTED VAULT', desc: 'AES-256 encrypted storage', color: 'text-cyan-400', border: 'border-cyan-500', bg: 'bg-cyan-500/10', details: 'All data is encrypted client-side before transmission. The server never sees raw data.' },
    { id: 3, icon: Lock, title: 'ZERO-TRUST VERIFICATION', desc: 'Heartbeat & inactivity monitor', color: 'text-violet-400', border: 'border-violet-500', bg: 'bg-violet-500/10', details: 'Continuous monitoring of user activity. Triggers only after missed heartbeats and grace periods expire.' },
    { id: 4, icon: Users, title: 'TRUST NETWORK', desc: 'Delegated recovery contacts', color: 'text-violet-400', border: 'border-violet-500', bg: 'bg-violet-500/10', details: 'Selected individuals who will receive notifications and partial decryption keys.' },
    { id: 5, icon: Key, title: 'MULTI-SIGNATURE AUTHORIZATION', desc: 'M-of-N threshold required', color: 'text-amber-400', border: 'border-amber-500', bg: 'bg-amber-500/10', details: 'Requires a quorum (e.g., 2 of 3) of trusted contacts to approve release before decryption can occur.' },
    { id: 6, icon: Unlock, title: 'CONTROLLED RELEASE', desc: 'Selective decryption & access', color: 'text-green-400', border: 'border-green-500', bg: 'bg-green-500/10', details: 'Data is released securely to authorized contacts according to the configured digital will.' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto pb-24">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          Privacy Architecture
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Our security model ensures zero-knowledge privacy. Your data remains encrypted until authorized release conditions are met.</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {layers.map((layer, index) => {
          const isExpanded = expandedId === layer.id;
          const isLast = index === layers.length - 1;

          return (
            <React.Fragment key={layer.id}>
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={`glass-card p-6 border-l-4 ${layer.border} cursor-pointer transition-colors hover:bg-white/[0.03]`}
                  onClick={() => setExpandedId(isExpanded ? null : layer.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${layer.bg} border border-white/5`}>
                      <layer.icon className={`w-6 h-6 ${layer.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white font-mono">{layer.title}</h3>
                      <p className="text-slate-400 text-sm">{layer.desc}</p>
                    </div>
                    <div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/5 text-slate-300 text-sm leading-relaxed">
                          {layer.details}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {!isLast && (
                <div className="py-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center gap-1"
                  >
                    <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacyArchitecture;
