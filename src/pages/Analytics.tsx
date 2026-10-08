import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Database, Lock, Users, Activity, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AuditEntry } from '../types';

const COLORS = ['#22d3ee', '#818cf8', '#34d399', '#f43f5e', '#fbbf24'];

const heartbeatData = [
  { name: 'Jan', value: 98 },
  { name: 'Feb', value: 99 },
  { name: 'Mar', value: 100 },
  { name: 'Apr', value: 97 },
  { name: 'May', value: 100 },
  { name: 'Jun', value: 100 },
];

const eventData = [
  { name: 'Auth', count: 45 },
  { name: 'Vault', count: 32 },
  { name: 'Network', count: 12 },
  { name: 'Security', count: 8 },
];

const trustData = [
  { name: 'Verified', value: 3 },
  { name: 'Pending', value: 1 },
];

export default function Analytics() {
  const vaultItems = useStore((s) => s.vaultItems);
  const auditLog = useStore((s) => s.auditLog);
  const heartbeat = useStore((s) => s.heartbeat);
  const contacts = useStore((s) => s.contacts);

  const vaultData = [
    { name: 'Photos', value: vaultItems.filter(i => i.category === 'photos').length || 3 },
    { name: 'Documents', value: vaultItems.filter(i => i.category === 'documents').length || 4 },
    { name: 'Credentials', value: vaultItems.filter(i => i.category === 'credentials').length || 3 },
    { name: 'Recovery', value: vaultItems.filter(i => i.category === 'recovery').length || 3 },
    { name: 'Files & Assets', value: vaultItems.filter(i => i.category === 'files' || i.category === 'assets').length || 5 },
  ];

  const metrics = [
    { title: 'Vault Items', value: vaultItems.length, icon: Database, color: 'text-cyan-400' },
    { title: 'Encrypted', value: vaultItems.filter(i => i.encrypted).length, icon: Lock, color: 'text-violet-400' },
    { title: 'Trusted Contacts', value: contacts.length, icon: Users, color: 'text-emerald-400' },
    { title: 'Success Heartbeats', value: heartbeat.consecutiveCheckins, icon: Activity, color: 'text-blue-400' },
    { title: 'Security Events', value: auditLog.filter((l: AuditEntry) => l.category === 'security').length, icon: ShieldCheck, color: 'text-amber-400' },
    { title: 'Emergency Events', value: 0, icon: ShieldAlert, color: 'text-red-400' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          Analytics & Insights
        </h1>
        <p className="text-slate-400 mt-2">Comprehensive overview of system health and metrics.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-4 border border-slate-700/50 flex flex-col items-center text-center gap-2"
            >
              <div className={`p-2 rounded-full bg-slate-800 ${metric.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-xs text-slate-400">{metric.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-6">Heartbeat Reliability (6 Mo)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartbeatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} dot={{ fill: '#0f172a', stroke: '#22d3ee', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-6">Security Events by Category</h2>
          <div className="h-64">
            <BarChart data={eventData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#1e293b' }}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </div>
        </div>

        <div className="glass-card p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-6">Vault Composition</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vaultData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vaultData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-6">Trust Network Health</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trustData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {trustData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#34d399' : '#fbbf24'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
