import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Circle, Lock } from 'lucide-react';

interface TimelineStepProps {
  label: string;
  status: 'completed' | 'active' | 'pending' | 'locked';
  timestamp?: string;
  isLast?: boolean;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({ label, status, timestamp, isLast }) => {
  let Icon = Circle;
  let color = 'text-slate-500';
  let bgColor = 'bg-slate-800';
  let borderColor = 'border-slate-700';

  if (status === 'completed') {
    Icon = Check;
    color = 'text-green-400';
    bgColor = 'bg-green-950/50';
    borderColor = 'border-green-500/50';
  } else if (status === 'active') {
    Icon = Clock;
    color = 'text-cyan-400';
    bgColor = 'bg-cyan-950/50';
    borderColor = 'border-cyan-500';
  } else if (status === 'locked') {
    Icon = Lock;
    color = 'text-slate-600';
    bgColor = 'bg-slate-900';
    borderColor = 'border-slate-800';
  }

  return (
    <div className="relative flex gap-4 pb-8">
      {!isLast && (
        <div className={`absolute left-[11px] top-7 bottom-0 w-0.5 ${status === 'completed' ? 'bg-green-500/30' : 'bg-slate-800'}`} />
      )}
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${bgColor} ${borderColor}`}
      >
        <Icon className={`w-3.5 h-3.5 ${color} ${status === 'active' ? 'animate-pulse' : ''}`} />
      </motion.div>
      
      <div className="flex flex-col pt-0.5">
        <h4 className={`text-sm font-medium ${status === 'locked' ? 'text-slate-500' : 'text-slate-200'}`}>
          {label}
        </h4>
        {timestamp && (
          <span className="text-xs text-slate-500 mt-1 font-mono">{timestamp}</span>
        )}
      </div>
    </div>
  );
};
