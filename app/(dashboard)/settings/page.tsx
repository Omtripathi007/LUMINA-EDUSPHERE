'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, ShieldCheck, Database, Save, CheckCircle, AlertTriangle, Bell, User } from 'lucide-react';

export default function SettingsPage() {
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Mercer');
  const [email, setEmail] = useState('alex.mercer@lumina.edu');
  const [isSaved, setIsSaved] = useState(false);
  
  // Database status states
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'demo'>('checking');
  const [supabaseUrl, setSupabaseUrl] = useState('');

  useEffect(() => {
    // Read environments via process.env
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && key) {
      setDbStatus('connected');
      setSupabaseUrl(url);
    } else {
      setDbStatus('demo');
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none font-sans">
      {/* Header Panel */}
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
          Account Settings
        </h2>
        <p className="text-xs md:text-sm text-text-secondary font-medium">
          Manage your personal profile, notification preferences, and system integrations.
        </p>
      </header>

      {/* Settings Grid */}
      <div className="grid grid-cols-12 gap-6 w-full">
        
        {/* Left Column: General Configuration Form (Spans 8 cols) */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <User className="h-4.5 w-4.5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wider">PROFILE DETAILS</h3>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-cyan-500/50 text-sm text-white focus:outline-none placeholder-text-muted"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-cyan-500/50 text-sm text-white focus:outline-none placeholder-text-muted"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-xl bg-black/40 border border-white/5 focus:border-cyan-500/50 text-sm text-white focus:outline-none placeholder-text-muted"
              />
            </div>

            {/* Save indicator button */}
            <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-4">
              <span className="text-[10px] text-text-secondary font-medium">
                Last updated: Just now
              </span>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 active:scale-98 transition-all duration-200 cursor-pointer shadow-md"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>

          {/* Success Toast */}
          <motion.div 
            className="absolute bottom-6 left-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.05)] pointer-events-none"
            animate={{ opacity: isSaved ? 1 : 0, y: isSaved ? 0 : 10 }}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Profile details saved successfully!</span>
          </motion.div>
        </div>

        {/* Right Column: Database Diagnostics & Integrations (Spans 4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          

          {/* Preferences Settings (Toggles) */}
          <div className="glass-card rounded-3xl p-5 border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[154px] group">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
              <Bell className="h-4.5 w-4.5 text-purple-400" />
              <h3 className="text-xs font-bold text-white tracking-wider">NOTIFICATION RULES</h3>
            </div>

            <div className="flex flex-col gap-3 text-xs font-semibold text-text-secondary select-none">
              <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" defaultChecked className="accent-cyan-400" />
                <span>Daily study goal alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" defaultChecked className="accent-cyan-400" />
                <span>Leaderboard rank changes</span>
              </label>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
