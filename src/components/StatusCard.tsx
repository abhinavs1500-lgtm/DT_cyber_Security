import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  status: 'active' | 'warning' | 'critical' | 'standby';
  icon: LucideIcon;
  subtitle?: string;
  onClick?: () => void;
}

const statusColors = {
  active: 'bg-green-500',
  warning: 'bg-amber-500',
  critical: 'bg-red-500',
  standby: 'bg-slate-500'
};

const statusTextColors = {
  active: 'text-green-400',
  warning: 'text-amber-400',
  critical: 'text-red-400',
  standby: 'text-slate-400'
};

const statusBorders = {
  active: 'border-green-500/20 glow-green',
  warning: 'border-amber-500/20',
  critical: 'border-red-500/30 glow-red',
  standby: 'border-slate-700'
};

export const StatusCard: React.FC<StatusCardProps> = ({ title, value, status, icon: Icon, subtitle, onClick }) => {
  return (
    <motion.div 
      whileHover={onClick ? { y: -2 } : {}}
      className={`glass-card p-4 rounded-xl border ${statusBorders[status]} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-lg bg-slate-800 ${statusTextColors[status]}`}>
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        </div>
        <div className={`w-2 h-2 rounded-full ${statusColors[status]} ${status !== 'standby' ? 'animate-pulse' : ''}`} />
      </div>
      <div className="mt-4">
        <div className="text-2xl font-mono font-bold text-slate-100">{value}</div>
        {subtitle && (
          <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
        )}
      </div>
    </motion.div>
  );
};
