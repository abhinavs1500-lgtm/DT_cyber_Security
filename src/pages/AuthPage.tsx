import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'demo'>('demo');
  const navigate = useNavigate();
  const { login } = useStore();

  const handleDemoLogin = () => {
    login(true);
    navigate('/dashboard');
  };

  const handleStandardAuth = (e: React.FormEvent) => {
    e.preventDefault();
    login(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.4) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 pb-6 border-b border-gray-800/50 flex flex-col items-center">
          <motion.div 
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="mb-4 text-cyan-400"
          >
            <Shield className="w-12 h-12" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white tracking-wide">DMDK SECURE ACCESS</h2>
          
          <div className="flex items-center space-x-2 mt-2 text-xs font-mono text-green-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>E2E ENCRYPTION ACTIVE</span>
          </div>
        </div>

        <div className="flex w-full border-b border-gray-800">
          {[
            { id: 'login', label: 'Login' },
            { id: 'signup', label: 'Create Account' },
            { id: 'demo', label: 'Demo Mode' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'login' | 'signup' | 'demo')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
              )}
            </button>
          ))}
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'login' && (
              <motion.form 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleStandardAuth}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input type="email" required className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" placeholder="user@example.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input type="password" required className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" placeholder="••••••••" />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(8,145,178,0.3)]">
                  DECRYPT & LOGIN
                </button>
              </motion.form>
            )}

            {activeTab === 'signup' && (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleStandardAuth}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input type="text" required className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" placeholder="John Doe" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input type="email" required className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" placeholder="user@example.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Master Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input type="password" required className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" placeholder="••••••••" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input type="password" required className="w-full bg-gray-950 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" placeholder="••••••••" />
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 bg-gray-100 hover:bg-white text-gray-900 font-bold py-3 rounded-xl transition-all">
                  INITIALIZE VAULT
                </button>
              </motion.form>
            )}

            {activeTab === 'demo' && (
              <motion.div 
                key="demo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="w-16 h-16 bg-cyan-950 rounded-full flex items-center justify-center text-cyan-400 mb-2">
                  <Key className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Explore the Platform</h3>
                  <p className="text-sm text-gray-400">Experience the full command center, simulate emergencies, and understand the workflow without committing real data.</p>
                </div>
                
                <div className="w-full bg-gray-950 border border-gray-800 rounded-lg p-4 text-left font-mono text-xs text-gray-500 space-y-2">
                  <div className="flex justify-between"><span>User:</span> <span className="text-gray-300">demo_user_01</span></div>
                  <div className="flex justify-between"><span>Clearance:</span> <span className="text-cyan-400">ADMIN</span></div>
                  <div className="flex justify-between"><span>Mode:</span> <span className="text-yellow-400">SIMULATION</span></div>
                </div>

                <button 
                  onClick={handleDemoLogin} 
                  className="w-full group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  <span>ENTER DEMO MODE</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
