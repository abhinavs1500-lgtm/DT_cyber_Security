import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SecurityMeterProps {
  score: number;
  size?: number;
  label?: string;
}

export const SecurityMeter: React.FC<SecurityMeterProps> = ({ score, size = 120, label = 'SECURITY SCORE' }) => {
  const [currentScore, setCurrentScore] = useState(0);
  
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += score / steps;
      if (current >= score) {
        setCurrentScore(score);
        clearInterval(timer);
      } else {
        setCurrentScore(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [score]);

  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = '#ef4444'; // red
  let glowClass = 'glow-red';
  if (score >= 90) {
    color = '#22c55e'; // green
    glowClass = 'glow-green';
  } else if (score >= 70) {
    color = '#f59e0b'; // amber
    glowClass = '';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-800"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            className={glowClass}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-mono font-bold" style={{ color }}>
            {currentScore}
          </span>
        </div>
      </div>
      {label && <span className="mt-3 text-xs font-semibold text-slate-400 tracking-wider uppercase">{label}</span>}
    </div>
  );
};
