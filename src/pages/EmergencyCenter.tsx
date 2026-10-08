import React from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, ShieldCheck, CheckCircle, Unlock, Lock, AlertOctagon } from 'lucide-react';

const TimelineStep = ({ title, desc, active, completed, isLast }: any) => (
  <div className="relative flex gap-4 pb-8 last:pb-0">
    {!isLast && (
      <div className={`absolute left-[15px] top-[30px] bottom-0 w-0.5 ${completed ? 'bg-emerald-500' : 'bg-gray-800'}`} />
    )}
    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
      completed ? 'bg-emerald-500 border-emerald-500 text-white' : 
      active ? 'bg-indigo-600 border-indigo-500 text-white animate-pulse' : 
      'bg-gray-900 border-gray-700 text-gray-500'
    }`}>
      {completed ? <CheckCircle className="w-5 h-5" /> : <div className="w-2.5 h-2.5 rounded-full bg-current" />}
    </div>
    <div>
      <h4 className={`font-semibold ${completed || active ? 'text-white' : 'text-gray-500'}`}>{title}</h4>
      <p className="text-sm text-gray-400 mt-1">{desc}</p>
    </div>
  </div>
);

export default function EmergencyCenter() {
  const { emergencyEvent, simulateRelease, cancelEmergency, panicLock, setPanicLock, contacts = [] } = useStore() as any;

  const togglePanicLock = () => {
    if (setPanicLock) setPanicLock(!panicLock);
  };

  const approvedCount = contacts.filter((c: any) => c.status === 'approved').length || 0;
  const isApproved = approvedCount >= 2;

  if (!emergencyEvent) {
    return (
      <div className="p-6 max-w-4xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center">
        <ShieldCheck className="w-20 h-20 text-gray-700 mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Emergency Release Center</h1>
        <p className="text-xl text-gray-400">No Active Emergency</p>
        <div className="mt-8 px-6 py-3 bg-[#1A1E2E] border border-gray-800 rounded-full text-gray-500 text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          System in standby monitoring mode
        </div>
      </div>
    );
  }

  const { id = 'DK-20481', triggerType = 'Missed Heartbeat', timestamp = new Date().toISOString(), status = 'active' } = emergencyEvent;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-red-950/40 border border-red-900/50 rounded-2xl p-6">
        <div>
          <h1 className="text-3xl font-bold text-red-500 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            Emergency Release Center
          </h1>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="text-gray-300">Event ID: <span className="font-mono text-white">{id}</span></span>
            <span className="text-gray-300">Trigger: <span className="text-red-400 font-semibold">{triggerType}</span></span>
            <span className="text-gray-300 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(timestamp).toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={togglePanicLock}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              panicLock ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {panicLock ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            {panicLock ? 'Unlock Protocol' : 'Emergency Lock'}
          </button>
          
          <button 
            onClick={() => cancelEmergency && cancelEmergency()}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Cancel Emergency
          </button>
        </div>
      </div>

      {panicLock && (
        <div className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
          <AlertOctagon className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-500 font-bold">Emergency protocol has been frozen</h3>
            <p className="text-red-200 text-sm mt-1">Manual panic lock engaged. All automated release procedures are suspended and vault access is blocked.</p>
          </div>
        </div>
      )}

      {status === 'released' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-900/20 border border-emerald-500/50 rounded-2xl p-12 text-center"
        >
          <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: 'spring', damping: 10, stiffness: 100 }}
             className="w-24 h-24 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(16,185,129,0.5)]"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">SECURE RELEASE COMPLETE</h2>
          <p className="text-xl text-emerald-400">Encrypted vault package prepared for authorized recipients.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1A1E2E] border border-gray-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-8 border-b border-gray-800 pb-4">Release Procedure Timeline</h2>
            
            <div className="pl-2">
              <TimelineStep 
                title="Emergency Triggered" 
                desc="Heartbeat timeout expired without check-in."
                completed={true}
              />
              <TimelineStep 
                title="Grace Period" 
                desc="48-hour warning period concluded."
                completed={true}
              />
              <TimelineStep 
                title="Network Notified" 
                desc="Trust network contacts alerted via primary channels."
                completed={true}
              />
              <TimelineStep 
                title="Identity Verification" 
                desc="Contacts must authenticate their identities."
                completed={isApproved}
                active={!isApproved}
              />
              <TimelineStep 
                title="Threshold Authorization" 
                desc="Awaiting 2/3 approvals to proceed."
                completed={isApproved}
                active={!isApproved}
              />
              <TimelineStep 
                title="Package Decryption" 
                desc="Secure release of designated assets."
                active={isApproved && !panicLock}
                isLast={true}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1A1E2E] border border-gray-800 rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-800 pb-4">Security Checks</h2>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  No manual overrides detected
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  Time-lock conditions met
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  Smart contract state validated
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  {isApproved ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <div className="w-5 h-5 rounded-full border-2 border-indigo-500 animate-spin border-t-transparent" />}
                  Trust network threshold: {approvedCount}/3 Approvals
                </li>
              </ul>
            </div>

            <div className="bg-[#1A1E2E] border border-gray-800 rounded-2xl p-8 text-center">
              {isApproved && <div className="text-emerald-400 font-bold text-sm tracking-widest mb-4">DEMO RELEASE AUTHORIZED</div>}
              
              <button 
                disabled={!isApproved || panicLock}
                onClick={() => simulateRelease && simulateRelease()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                  isApproved && !panicLock
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Unlock className="w-6 h-6" />
                SIMULATE SECURE RELEASE
              </button>
              
              {!isApproved && (
                <p className="text-sm text-gray-500 mt-4">Requires multi-signature threshold authorization to proceed.</p>
              )}
              {panicLock && (
                <p className="text-sm text-red-500 mt-4">Release blocked due to active panic lock.</p>
              )}
            </div>
            
            <div className="bg-[#151828] border border-gray-800 rounded-xl p-4 text-xs font-mono text-gray-500">
              <div className="flex justify-between border-b border-gray-800 pb-2 mb-2">
                <span>AUDIT TRAIL</span>
                <span>ID: {id}</span>
              </div>
              <div className="space-y-1">
                <div>[{new Date(timestamp).toISOString().split('T')[1].substring(0,8)}] INIT: Missed Heartbeat Trigger</div>
                <div>[{new Date(timestamp).toISOString().split('T')[1].substring(0,8)}] EVENT: Entering Grace Period</div>
                <div>[+48h 00m] EVENT: Grace Period Expired</div>
                <div>[+48h 01m] NOTIFY: Dispatching Trust Network Alerts</div>
                {approvedCount > 0 && <div>[+52h 14m] AUTH: Signature 1 Verified</div>}
                {approvedCount > 1 && <div>[+64h 30m] AUTH: Signature 2 Verified (Threshold Reached)</div>}
                {status === 'released' && <div className="text-emerald-500/70">[+64h 31m] EXEC: Secure Release Initiated</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
