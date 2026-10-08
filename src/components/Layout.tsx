import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Lock, Heart, Users, AlertTriangle, FlaskConical,
  GitBranch, Map, Shield, FileText, BarChart3, Play, Scroll, Network,
  Settings as SettingsIcon, Key, Bell, User, Menu, X, CheckCheck, Trash2,
  Sparkles, ShieldCheck, HeartPulse, AlertOctagon, CheckCircle2
} from 'lucide-react';
import { useStore } from '../store/useStore';
import Toast from './Toast';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/', color: 'text-cyan-400', activeBg: 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300' },
  { icon: Lock, label: 'Digital Vault', path: '/vault', color: 'text-emerald-400', activeBg: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300' },
  { icon: Heart, label: 'Heartbeat', path: '/heartbeat', color: 'text-rose-400', activeBg: 'bg-rose-500/10 border-rose-500/50 text-rose-300' },
  { icon: Users, label: 'Trust Network', path: '/trust-network', color: 'text-purple-400', activeBg: 'bg-purple-500/10 border-purple-500/50 text-purple-300' },
  { icon: AlertTriangle, label: 'Emergency Center', path: '/emergency', color: 'text-amber-400', activeBg: 'bg-amber-500/10 border-amber-500/50 text-amber-300' },
  { icon: FlaskConical, label: 'Simulator', path: '/simulator', color: 'text-fuchsia-400', activeBg: 'bg-fuchsia-500/10 border-fuchsia-500/50 text-fuchsia-300' },
  { icon: GitBranch, label: 'Workflow', path: '/workflow', color: 'text-blue-400', activeBg: 'bg-blue-500/10 border-blue-500/50 text-blue-300' },
  { icon: Map, label: 'Legacy Map', path: '/legacy-map', color: 'text-teal-400', activeBg: 'bg-teal-500/10 border-teal-500/50 text-teal-300' },
  { icon: Shield, label: 'Security Center', path: '/security', color: 'text-emerald-400', activeBg: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300' },
  { icon: FileText, label: 'Audit Log', path: '/audit', color: 'text-indigo-400', activeBg: 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics', color: 'text-amber-400', activeBg: 'bg-amber-500/10 border-amber-500/50 text-amber-300' },
  { icon: Play, label: 'Recovery Drill', path: '/drill', color: 'text-cyan-400', activeBg: 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300' },
  { icon: Scroll, label: 'Digital Will', path: '/digital-will', color: 'text-violet-400', activeBg: 'bg-violet-500/10 border-violet-500/50 text-violet-300' },
  { icon: Network, label: 'Architecture', path: '/privacy', color: 'text-pink-400', activeBg: 'bg-pink-500/10 border-pink-500/50 text-pink-300' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings', color: 'text-slate-400', activeBg: 'bg-slate-500/10 border-slate-500/50 text-slate-200' },
];

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const app = useStore((s) => s.app);
  const demoActive = useStore((s) => s.demoActive);
  const currentDemoStep = useStore((s) => s.currentDemoStep);
  const notifications = useStore((s) => s.notifications);
  const markNotificationRead = useStore((s) => s.markNotificationRead);
  const clearNotifications = useStore((s) => s.clearNotifications);
  const addNotification = useStore((s) => s.addNotification);

  const emergencyMode = app.emergencyMode;
  const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen]);

  const handleMarkAllRead = () => {
    notifications.forEach(n => markNotificationRead(n.id));
  };

  const handleSendTestNotification = () => {
    addNotification({
      type: 'info',
      title: 'Real-time Security Ping',
      message: 'Zero-trust verification handshake confirmed across 3 active nodes.',
      icon: 'shield'
    });
  };

  return (
    <div className="flex h-screen w-full bg-[#070a13] text-slate-200 overflow-hidden relative selection:bg-cyan-500 selection:text-slate-950">
      {/* Toast Notifications System */}
      <Toast />

      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 particle-bg circuit-pattern opacity-40 pointer-events-none" />

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0f1d]/95 backdrop-blur-2xl border-r border-slate-800/80 transform transition-transform duration-300 ease-in-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-2xl`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-cyan-950/30 via-slate-900 to-purple-950/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-purple-600 p-0.5 glow-cyan shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Key className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-purple-300">
                DEAD-MAN'S
              </h1>
              <p className="text-[10px] tracking-wider text-slate-400 font-mono">DIGITAL KEY</p>
            </div>
          </div>
          <button className="md:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-1 px-3 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={() => `flex items-center space-x-3 px-3 py-2.5 rounded-xl border transition-all duration-200 group ${
                  isActive 
                    ? `${item.activeBg} shadow-lg font-bold border-l-4` 
                    : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:border-slate-700/50'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? item.color : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="text-xs font-medium tracking-wide">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Demo Mode Progress Indicator */}
        {demoActive && (
          <div className="p-4 border-t border-slate-800/80 bg-gradient-to-b from-transparent to-cyan-950/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                Demo Progress
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-800/50">
                {(currentDemoStep || 0) + 1} / 8
              </span>
            </div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 rounded-full transition-all duration-500 glow-cyan" 
                style={{ width: `${(((currentDemoStep || 0) + 1) / 8) * 100}%` }} 
              />
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Emergency Alert Banner */}
        {emergencyMode && (
          <div className="bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-b border-red-500/50 text-red-200 px-4 py-2.5 flex items-center justify-between animate-pulse shadow-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
              <span className="text-xs font-black tracking-widest uppercase">EMERGENCY PROTOCOL ACTIVE — TRUST CONSENSUS IN PROGRESS</span>
            </div>
            <span className="text-[10px] font-mono bg-red-950 border border-red-500/40 px-2 py-0.5 rounded text-red-300">
              PROTOCOL #DK-20481
            </span>
          </div>
        )}

        {/* Top Header Navigation */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0a0f1d]/70 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 shadow-md">
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            
            {/* System Status Pill */}
            <div className="flex items-center space-x-2 glass-card px-3.5 py-1.5 rounded-full border border-slate-700/60 bg-slate-900/80">
              <div className={`w-2.5 h-2.5 rounded-full ${
                emergencyMode 
                  ? 'bg-red-500 animate-ping' 
                  : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              }`} />
              <span className={`text-xs font-black tracking-wider uppercase ${
                emergencyMode ? 'text-red-400' : 'text-emerald-300'
              }`}>
                {emergencyMode ? 'EMERGENCY ACTIVE' : 'SYSTEM SECURE'}
              </span>
            </div>

            {/* Inactivity Clock Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-400 font-mono">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              <span>Heartbeat: <strong className="text-slate-200">Active</strong></span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Bell Dropdown Button */}
            <div className="relative" ref={notificationDropdownRef}>
              <button 
                className={`p-2.5 rounded-xl border transition-all duration-300 relative flex items-center justify-center ${
                  notificationsOpen 
                    ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 glow-cyan' 
                    : unreadCount > 0 
                      ? 'bg-slate-800/90 border-slate-700 hover:border-cyan-500/40 text-slate-200' 
                      : 'bg-slate-800/50 border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Toggle notifications"
                title="Notifications"
              >
                <Bell className={`w-5 h-5 transition-transform duration-200 ${notificationsOpen ? 'scale-110' : ''}`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-rose-500 to-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg border-2 border-[#0a0f1d] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notification Popover Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-84 sm:w-96 glass-card rounded-2xl shadow-2xl border border-slate-700/80 bg-[#0d1326]/95 backdrop-blur-2xl overflow-hidden z-[200]"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-bold text-sm text-white">System Notifications</h3>
                        {unreadCount > 0 && (
                          <span className="bg-cyan-950 text-cyan-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-800/60 font-bold">
                            {unreadCount} New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {unreadCount > 0 && (
                          <button 
                            onClick={handleMarkAllRead}
                            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 rounded-lg transition-colors text-xs flex items-center gap-1"
                            title="Mark all as read"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button 
                          onClick={clearNotifications}
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition-colors text-xs"
                          title="Clear all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto custom-scrollbar p-2 space-y-2">
                      {!notifications || notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-sm">
                          <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="font-medium text-slate-300">All caught up!</p>
                          <p className="text-xs text-slate-500 mt-1">No security alerts or pending notifications.</p>
                        </div>
                      ) : (
                        notifications.map((n) => {
                          const isUnread = !n.read;
                          let iconClass = 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50';
                          let IconComponent = ShieldCheck;
                          
                          if (n.type === 'success') {
                            iconClass = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50';
                            IconComponent = CheckCircle2;
                          } else if (n.type === 'warning') {
                            iconClass = 'text-amber-400 bg-amber-950/60 border-amber-800/50';
                            IconComponent = AlertTriangle;
                          } else if (n.type === 'error') {
                            iconClass = 'text-rose-400 bg-rose-950/60 border-rose-800/50';
                            IconComponent = AlertOctagon;
                          }

                          return (
                            <motion.div 
                              key={n.id} 
                              onClick={() => markNotificationRead(n.id)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 relative group ${
                                isUnread 
                                  ? 'bg-slate-900/90 border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800/80' 
                                  : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/70 text-slate-400'
                              }`}
                            >
                              <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${iconClass}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className={`text-xs font-bold truncate ${isUnread ? 'text-white' : 'text-slate-300'}`}>
                                    {n.title}
                                  </h4>
                                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                                    {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                  {n.message}
                                </p>
                              </div>
                              {isUnread && (
                                <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1.5 glow-cyan" />
                              )}
                            </motion.div>
                          );
                        })
                      )}
                    </div>

                    {/* Footer Trigger for Judges */}
                    <div className="p-2.5 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
                      <button 
                        onClick={handleSendTestNotification}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold px-2 py-1 rounded hover:bg-cyan-950/50 transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3" />
                        Trigger Test Alert
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Zero-Trust Security Log
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Profile Avatar */}
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-purple-600 p-0.5 glow-cyan">
                <div className="h-full w-full bg-slate-900 rounded-[10px] flex items-center justify-center font-bold text-xs text-cyan-300">
                  {app.currentUser?.avatar || 'AC'}
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-200 leading-tight">{app.currentUser?.name || 'Alex Chen'}</p>
                <p className="text-[10px] text-emerald-400 font-mono">Vault Owner</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 custom-scrollbar relative">
          <Outlet />
        </main>

        {/* Security Disclaimer Footer */}
        <footer className="py-2.5 px-4 border-t border-slate-800/80 text-center bg-[#070a13]/90 backdrop-blur-md">
          <p className="text-[11px] text-slate-400">
            <span className="text-cyan-400 font-semibold">Dead-Man's Digital Key Prototype</span> — All data, encryption routines, and emergency multi-signature operations are simulated for demonstration.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
