import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Toast: React.FC = () => {
  const notifications = useStore((s) => s.notifications);
  const markNotificationRead = useStore((s) => s.markNotificationRead);

  const activeToasts = (notifications || []).filter(n => !n.read).slice(0, 3);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {activeToasts.map((toast) => {
          let Icon = Info;
          let colorClass = 'border-cyan-500/50 bg-slate-900/90 text-cyan-400';
          
          if (toast.type === 'success') {
            Icon = CheckCircle;
            colorClass = 'border-emerald-500/50 bg-slate-900/90 text-emerald-400 glow-green';
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
            colorClass = 'border-amber-500/50 bg-slate-900/90 text-amber-400 glow-amber';
          } else if (toast.type === 'error') {
            Icon = XCircle;
            colorClass = 'border-red-500/50 bg-slate-900/90 text-red-400 glow-red';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-80 p-4 rounded-xl border backdrop-blur-md shadow-xl pointer-events-auto flex items-start gap-3 ${colorClass}`}
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-100">{toast.title}</h4>
                {toast.message && (
                  <p className="text-xs mt-1 text-slate-300">{toast.message}</p>
                )}
              </div>
              <button 
                onClick={() => markNotificationRead(toast.id)}
                className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-slate-100" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
