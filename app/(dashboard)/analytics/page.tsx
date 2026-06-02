'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Flame, Calendar, Award, Zap, BookOpen } from 'lucide-react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const STUDY_HOURS = [2.1, 1.8, 3.5, 4.2, 1.2, 5.0, 3.2];
const SKILLS = [
  { name: 'React Patterns', progress: 75, color: 'from-orange-500 to-red-500' },
  { name: 'TypeScript Type Gymnastics', progress: 55, color: 'from-sky-400 to-blue-600' },
  { name: 'Next.js App Routing', progress: 90, color: 'from-purple-500 to-pink-500' },
  { name: 'Database Normalization', progress: 40, color: 'from-emerald-400 to-teal-500' },
];

export default function AnalyticsPage() {
  // SVG coordinates for our study hours curve line chart
  // M (x1, y1) L (x2, y2) ...
  const chartPath = "M 30,150 L 110,160 L 190,110 L 270,80 L 350,180 L 430,40 L 510,90";
  const glowPath = "M 30,150 L 110,160 L 190,110 L 270,80 L 350,180 L 430,40 L 510,90 L 510,210 L 30,210 Z";

  return (
    <div className="w-full flex flex-col gap-6 select-none font-sans">
      {/* Header Panel */}
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
          Performance Analytics
        </h2>
        <p className="text-xs md:text-sm text-text-secondary font-medium">
          Detailed metrics charting study velocity, proficiencies, and course accomplishments.
        </p>
      </header>

      {/* Grid Layout (Bento Style) */}
      <div className="grid grid-cols-12 gap-6 w-full">
        
        {/* 1. Main Curve Line Chart (Spans 8 cols on desktop) */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden flex flex-col justify-between h-[380px] group">
          <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-wider">WEEKLY STUDY HOURS</h3>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full">
              Avg: 3.1h / day
            </span>
          </div>

          {/* SVG Animated Chart */}
          <div className="w-full flex-grow relative flex items-center justify-center pt-2">
            <svg 
              viewBox="0 0 540 220" 
              className="w-full h-full max-h-[220px] overflow-visible"
              aria-label="Line graph charting daily hours"
            >
              <defs>
                <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="30" y1="210" x2="510" y2="210" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="30" y1="150" x2="510" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="30" y1="90" x2="510" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="30" y1="30" x2="510" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {/* Shaded Glow Area */}
              <motion.path
                d={glowPath}
                fill="url(#chart-glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Curve Line */}
              <motion.path
                d={chartPath}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />

              {/* Interactive Data Nodes */}
              {[
                { x: 30, y: 150, hours: 2.1 },
                { x: 110, y: 160, hours: 1.8 },
                { x: 190, y: 110, hours: 3.5 },
                { x: 270, y: 80, hours: 4.2 },
                { x: 350, y: 180, hours: 1.2 },
                { x: 430, y: 40, hours: 5.0 },
                { x: 510, y: 90, hours: 3.2 },
              ].map((pt, i) => (
                <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * i + 1 }}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4"
                    fill="#050505"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    className="cursor-pointer hover:r-6 hover:fill-cyan-400 transition-all duration-200"
                  />
                  {/* Small popover labels */}
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill="#a3a3a3"
                    fontSize="9"
                    fontWeight="bold"
                    className="opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  >
                    {pt.hours}h
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>

          {/* Weekday Legend */}
          <div className="flex justify-between px-[14px] text-[10px] font-bold text-text-secondary border-t border-white/5 pt-3">
            {WEEKDAYS.map((day, i) => (
              <span key={i} className="w-[30px] text-center">{day}</span>
            ))}
          </div>
        </div>

        {/* 2. Skills Proficiency Bar Chart (Spans 4 cols on desktop) */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden flex flex-col justify-between h-[380px] group">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4.5 w-4.5 text-purple-400" />
              <h3 className="text-sm font-bold text-white tracking-wider">SKILLS SPECTRUM</h3>
            </div>
          </div>

          {/* Bar Chart list */}
          <div className="flex flex-col gap-5 flex-grow justify-center">
            {SKILLS.map((skill, index) => (
              <div key={index} className="flex flex-col gap-1.5 w-full">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white truncate max-w-[200px]">{skill.name}</span>
                  <span className="text-text-secondary">{skill.progress}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/2">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-text-secondary font-medium pt-3 border-t border-white/5">
            Based on completed code chapters & submissions
          </div>
        </div>

        {/* 3. Metrics Summary Boxes (Bottom Row - 3 cols each) */}
        <div className="col-span-12 md:col-span-4 glass-card p-5 rounded-2xl border-white/5 flex items-center gap-4 group hover:border-white/10 accelerate-transition hover:shadow-[0_0_30px_rgba(239,68,68,0.02)]">
          <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
            <Flame className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">Active Streak</span>
            <span className="text-base font-extrabold text-white">14 Days Completed</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 glass-card p-5 rounded-2xl border-white/5 flex items-center gap-4 group hover:border-white/10 accelerate-transition hover:shadow-[0_0_30px_rgba(56,189,248,0.02)]">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
            <Award className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">Platform Badge</span>
            <span className="text-base font-extrabold text-white">Next.js Architect</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 glass-card p-5 rounded-2xl border-white/5 flex items-center gap-4 group hover:border-white/10 accelerate-transition hover:shadow-[0_0_30px_rgba(168,85,247,0.02)]">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Zap className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">Submission Rate</span>
            <span className="text-base font-extrabold text-white">92.4% Accuracy</span>
          </div>
        </div>

      </div>
    </div>
  );
}
