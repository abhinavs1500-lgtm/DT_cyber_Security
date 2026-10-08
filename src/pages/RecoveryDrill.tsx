import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, StepForward, RotateCcw, CheckCircle, Activity, Bell, Users, ShieldCheck, Unlock, ShieldAlert } from 'lucide-react';
import { useStore } from '../store/useStore';

const RecoveryDrill = () => {
  const { drillActive, drillStep, drillResult, startDrill, advanceDrill, endDrill } = useStore();

  const steps = [
    { step: 1, title: 'Start Drill', icon: Play, desc: 'Initialize the simulation' },
    { step: 2, title: 'Simulate Missed Heartbeat', icon: Activity, desc: 'Trigger the inactivity threshold' },
    { step: 3, title: 'Notify Contacts', icon: Bell, desc: 'Send mock alerts to trusted network' },
    { step: 4, title: 'Approve Contact #1', icon: Users, desc: 'Simulate first approval' },
    { step: 5, title: 'Approve Contact #2', icon: Users, desc: 'Simulate second approval' },
    { step: 6, title: 'Verify Threshold', icon: ShieldCheck, desc: 'Confirm quorum (2/3) reached' },
    { step: 7, title: 'Simulated Release', icon: Unlock, desc: 'Mock decryption process' }
  ];

  const currentStepData = steps.find(s => s.step === drillStep);
  const isComplete = drillResult === 'pass';

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-amber-400" />
          Recovery Drill
        </h1>
        <p className="text-slate-400">Safely test your emergency workflow without releasing actual data.</p>
      </div>

      <div className="glass-card p-8 mb-8 border-t-4 border-amber-500/50">
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Drill Control Panel</h2>
            <div className="text-sm font-mono flex items-center gap-2">
              <span className="text-slate-500">STATUS:</span>
              {drillActive ? (
                <span className="text-amber-400 animate-pulse">IN PROGRESS (STEP {drillStep}/7)</span>
              ) : isComplete ? (
                <span className="text-green-400">COMPLETE</span>
              ) : (
                <span className="text-slate-400">NOT STARTED</span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            {!drillActive && !isComplete && (
              <button onClick={startDrill} className="btn-primary flex items-center gap-2">
                <Play className="w-4 h-4" /> Start Drill
              </button>
            )}
            {drillActive && !isComplete && (
              <button onClick={advanceDrill} className="btn-primary flex items-center gap-2">
                <StepForward className="w-4 h-4" /> Advance Step
              </button>
            )}
            {(drillActive || isComplete) && (
              <button onClick={endDrill} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 border border-slate-700">
                <RotateCcw className="w-4 h-4" /> End Drill
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((s) => {
            const isActive = drillActive && drillStep === s.step;
            const isPast = drillStep > s.step || isComplete;
            
            return (
              <div 
                key={s.step} 
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  isActive ? 'bg-amber-500/10 border-amber-500/50 scale-[1.02]' : 
                  isPast ? 'bg-slate-800/30 border-green-500/20' : 
                  'bg-slate-900/50 border-white/5 opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-amber-500/20 text-amber-400' :
                  isPast ? 'bg-green-500/20 text-green-400' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  {isPast ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                
                <div className="flex-1">
                  <div className={`font-bold ${isActive ? 'text-amber-400' : isPast ? 'text-white' : 'text-slate-400'}`}>
                    Step {s.step}: {s.title}
                  </div>
                  <div className="text-sm text-slate-500">{s.desc}</div>
                </div>

                {isActive && (
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card p-12 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-50" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_50px_rgba(74,222,128,0.3)]"
            >
              <CheckCircle className="w-12 h-12 text-green-400" />
            </motion.div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-4">
              RECOVERY READINESS: PASS
            </h2>
            <p className="text-slate-300 max-w-md">Your emergency protocol executed successfully. Trusted contacts were able to authorize release without compromising security.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecoveryDrill;
