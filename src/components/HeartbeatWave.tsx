import React from 'react';
import { motion } from 'framer-motion';

interface HeartbeatWaveProps {
  status: 'healthy' | 'warning' | 'missed' | 'critical';
  height?: number;
  width?: number | string;
}

export const HeartbeatWave: React.FC<HeartbeatWaveProps> = ({ status, height = 60, width = '100%' }) => {
  let color = '#22c55e'; // healthy
  let duration = 2;
  let pathD = "M0,30 L20,30 L25,10 L30,50 L35,20 L40,30 L60,30 L65,15 L70,45 L75,30 L100,30";

  if (status === 'warning') {
    color = '#f59e0b';
    duration = 1.5;
    pathD = "M0,30 L20,30 L25,15 L30,45 L35,25 L40,30 L100,30";
  } else if (status === 'missed') {
    color = '#ef4444';
    duration = 3;
    pathD = "M0,30 L40,30 L45,25 L50,35 L55,30 L100,30";
  } else if (status === 'critical') {
    color = '#ef4444';
    duration = 0;
    pathD = "M0,30 L100,30";
  }

  return (
    <div style={{ height, width }} className="relative overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
        style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={status === 'critical' ? {} : { 
            pathLength: [0, 1],
            pathOffset: [0, 1]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
};
