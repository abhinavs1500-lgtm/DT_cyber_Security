import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft, Check, CheckCircle, FileText, Users, Clock, ShieldCheck, Play } from 'lucide-react';

const DigitalWill = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    categories: ['Photos'],
    contacts: ['Contact 1', 'Contact 2'],
    interval: '30',
    gracePeriod: '48h',
    threshold: '2/3'
  });

  const nextStep = () => setStep(s => Math.min(totalSteps, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const toggleCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FileText className="text-cyan-400"/> Choose Protected Categories</h3>
            {['Photos', 'Documents', 'Credentials', 'Recovery', 'Files', 'Assets'].map(cat => (
              <label key={cat} className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.categories.includes(cat) ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'}`}>
                  {formData.categories.includes(cat) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-white">{cat}</span>
              </label>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Users className="text-violet-400"/> Select Trusted Contacts</h3>
            {[1, 2, 3].map(i => (
              <label key={i} className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg border border-white/5 cursor-pointer hover:bg-white/5">
                <div className="w-5 h-5 rounded border border-violet-500 bg-violet-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-white">Trusted Contact #{i}</span>
              </label>
            ))}
            <p className="text-sm text-slate-400">Selected contacts will be part of your recovery network.</p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Clock className="text-amber-400"/> Configure Heartbeat</h3>
            <div className="p-6 bg-slate-800/50 rounded-lg border border-white/5">
              <label className="block text-sm text-slate-400 mb-2">Check-in Interval (Days)</label>
              <input 
                type="range" min="7" max="90" 
                value={formData.interval} 
                onChange={(e) => setFormData({...formData, interval: e.target.value})}
                className="w-full accent-cyan-500"
              />
              <div className="mt-4 text-center text-3xl font-bold text-cyan-400">{formData.interval} Days</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Clock className="text-amber-400"/> Configure Grace Period</h3>
            <div className="grid grid-cols-2 gap-4">
              {['24h', '48h', '72h', '7 days'].map(gp => (
                <button
                  key={gp}
                  onClick={() => setFormData({...formData, gracePeriod: gp})}
                  className={`p-4 rounded-lg border transition-all ${formData.gracePeriod === gp ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-white/5'}`}
                >
                  {gp}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><ShieldCheck className="text-green-400"/> Choose Approval Threshold</h3>
            <div className="space-y-3">
              {['1/3', '2/3', '3/3'].map(th => (
                <label key={th} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${formData.threshold === th ? 'bg-green-500/20 border-green-500' : 'bg-slate-800/50 border-white/5 hover:bg-white/5'}`}>
                  <input 
                    type="radio" 
                    name="threshold" 
                    checked={formData.threshold === th}
                    onChange={() => setFormData({...formData, threshold: th})}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.threshold === th ? 'border-green-400' : 'border-slate-500'}`}>
                    {formData.threshold === th && <div className="w-2.5 h-2.5 rounded-full bg-green-400" />}
                  </div>
                  <span className="text-white font-mono">{th} Approvals Required</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Review Plan</h3>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-white/5 space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Categories</span>
                <span className="text-white font-medium">{formData.categories.join(', ')}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Heartbeat</span>
                <span className="text-cyan-400 font-mono">{formData.interval} Days</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Grace Period</span>
                <span className="text-amber-400 font-mono">{formData.gracePeriod}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-slate-400">Threshold</span>
                <span className="text-green-400 font-mono">{formData.threshold}</span>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center py-12"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
              <Shield className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">DIGITAL LEGACY PLAN ACTIVE</h2>
            <p className="text-slate-400">Your digital estate is now protected and will be securely managed according to your instructions.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          Digital Legacy Plan
        </h1>
        <p className="text-slate-400">Configure your digital will and recovery instructions.</p>
      </div>

      <div className="glass-card p-8 min-h-[400px] flex flex-col relative overflow-hidden">
        {step < 7 && (
          <div className="mb-8">
            <div className="text-xs font-mono text-slate-500 mb-2 uppercase">Step {step} of {totalSteps - 1}</div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-300"
                style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {step < 7 && (
          <div className="mt-8 flex justify-between pt-6 border-t border-white/10">
            <button 
              onClick={prevStep}
              disabled={step === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${step === 1 ? 'opacity-50 cursor-not-allowed text-slate-500' : 'text-white bg-slate-800 hover:bg-slate-700 border border-white/10'}`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            
            <button 
              onClick={nextStep}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
            >
              {step === totalSteps - 1 ? 'Activate Plan' : 'Next'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalWill;
