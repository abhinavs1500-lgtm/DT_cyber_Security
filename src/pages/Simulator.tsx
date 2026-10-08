import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Clock, Lock, AlertTriangle, UserX, ShieldAlert, Shield, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const scenarios = [
  { id: 'device-lost', title: 'Primary Device Lost', icon: Laptop, description: 'Simulate losing access to your main device.' },
  { id: 'inactive', title: 'User Inactive', icon: Clock, description: 'Simulate failing to check in.' },
  { id: 'lockout', title: 'Account Lockout', icon: Lock, description: 'Simulate being locked out of your account.' },
  { id: 'suspicious', title: 'Suspicious Access', icon: AlertTriangle, description: 'Simulate an unauthorized access attempt.' },
  { id: 'contact-lost', title: 'Trusted Contact Unavailable', icon: UserX, description: 'Simulate a trusted contact being unresponsive.' }
];

const scenarioSteps = {
  'device-lost': [
    { title: 'Identity verification failed on new device', status: 'alert' },
    { title: 'Emergency lock activated', status: 'action' },
    { title: 'Vault remains protected', status: 'safe' },
    { title: 'Trusted network notified via secondary channels', status: 'action' },
    { title: 'Recovery workflow initiated', status: 'safe' }
  ],
  'inactive': [
    { title: 'Heartbeat deadline missed', status: 'alert' },
    { title: 'Grace period initiated (24h)', status: 'action' },
    { title: 'Automated warnings sent to user', status: 'action' },
    { title: 'Grace period expires', status: 'alert' },
    { title: 'Dead Man\'s Switch triggered', status: 'safe' }
  ],
  'lockout': [
    { title: 'Multiple failed login attempts detected', status: 'alert' },
    { title: 'Temporary account freeze', status: 'action' },
    { title: 'Recovery codes required for access', status: 'action' },
    { title: 'Identity reverification with Trust Network', status: 'safe' }
  ],
  'suspicious': [
    { title: 'Login attempt from unknown location', status: 'alert' },
    { title: 'Access immediately blocked', status: 'action' },
    { title: 'Vault goes into lockdown mode', status: 'safe' },
    { title: 'Alert sent to all trusted contacts', status: 'action' }
  ],
  'contact-lost': [
    { title: 'Trusted contact unresponsive to verification', status: 'alert' },
    { title: 'Contact marked as temporarily unavailable', status: 'action' },
    { title: 'Trust score recalculated', status: 'action' },
    { title: 'Alternative recovery paths prioritized', status: 'safe' }
  ]
};

export default function Simulator() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const addThreat = useStore((s) => s.addThreat);
  const completeDemoStep = useStore((s) => s.completeDemoStep);
  const [isSimulatingThreat, setIsSimulatingThreat] = useState(false);

  useEffect(() => {
    completeDemoStep(7);
  }, [completeDemoStep]);

  const handleSimulateThreat = () => {
    setIsSimulatingThreat(true);
    addThreat({
      type: 'Suspicious Location',
      risk: 'high',
      description: 'Unauthorized access attempt detected from unknown IP address (198.51.100.42)',
    });
    setTimeout(() => {
      setIsSimulatingThreat(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
          Emergency Simulator
        </h1>
        <p className="text-slate-400 mt-2">Test protocol responses to various emergency scenarios.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            "What If?" Scenarios
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              const isActive = activeScenario === scenario.id;
              
              return (
                <motion.div 
                  key={scenario.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveScenario(scenario.id)}
                  className={`glass-card-hover p-4 cursor-pointer border ${isActive ? 'border-cyan-500/50 bg-cyan-900/10' : 'border-slate-700/50'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{scenario.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{scenario.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border border-slate-700/50 min-h-[400px]">
            <h2 className="text-xl font-semibold text-white mb-6">Protocol Response</h2>
            <AnimatePresence mode="wait">
              {activeScenario ? (
                <motion.div
                  key={activeScenario}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {scenarioSteps[activeScenario as keyof typeof scenarioSteps].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${
                          step.status === 'alert' ? 'bg-red-500' :
                          step.status === 'action' ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`} />
                        {index !== scenarioSteps[activeScenario as keyof typeof scenarioSteps].length - 1 && (
                          <div className="absolute top-3 left-1.5 w-px h-10 bg-slate-700" />
                        )}
                      </div>
                      <div className="glass-card p-3 flex-1 rounded-lg border border-slate-700/50">
                        <span className="text-sm text-slate-300">{step.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 min-h-[300px]">
                  <Shield className="w-12 h-12 mb-4 opacity-50" />
                  <p>Select a scenario to view the protocol response.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="glass-card p-6 border border-slate-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">Live Threat Simulation</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Normal Login</span>
                <span className="text-emerald-400 font-semibold">Low Risk</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Unknown Device</span>
                <span className="text-amber-400 font-semibold">Medium Risk</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Multiple Failed Attempts</span>
                <span className="text-red-400 font-semibold">High Risk</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Suspicious Location</span>
                <span className="text-red-400 font-semibold">High Risk</span>
              </div>
            </div>
            
            <button
              onClick={handleSimulateThreat}
              disabled={isSimulatingThreat}
              className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors border border-red-500/30 flex justify-center items-center gap-2"
            >
              {isSimulatingThreat ? (
                <>
                  <Lock className="w-5 h-5 animate-pulse" />
                  TEMPORARY VAULT LOCK ACTIVE
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5" />
                  Simulate Threat Event
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
