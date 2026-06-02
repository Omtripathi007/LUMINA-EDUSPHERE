'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Info } from 'lucide-react';
import { generateMockActivity, ActivityDay } from '@/lib/mock-data';

const activityData = generateMockActivity();

const levelColors = {
  0: 'bg-neutral-900/60 hover:bg-neutral-800 border-white/2',
  1: 'bg-cyan-950/40 hover:bg-cyan-900/60 border-cyan-900/20 shadow-[0_0_4px_rgba(6,182,212,0.05)]',
  2: 'bg-cyan-800/40 hover:bg-cyan-700/60 border-cyan-700/20 shadow-[0_0_6px_rgba(6,182,212,0.1)]',
  3: 'bg-cyan-600/50 hover:bg-cyan-500/70 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]',
  4: 'bg-cyan-400/70 hover:bg-cyan-300 border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.35)]',
};

export default function ActivityTile() {
  const [hoveredCell, setHoveredCell] = useState<ActivityDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - bounds.left + 10,
      y: e.clientY - bounds.top - 40,
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 150, damping: 15 }
    },
  };

  return (
    <article className="relative overflow-hidden rounded-3xl glass-card p-6 flex flex-col justify-between h-[280px] group transition-all duration-500 hover:border-white/10 hover:shadow-[0_0_50px_rgba(6,182,212,0.04)] col-span-12 lg:col-span-4 md:col-span-2">
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-115 accelerate-transition" />
      
      <div className="relative z-10 flex flex-col gap-3 select-none">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white tracking-wider">
              LEARNING ACTIVITY
            </h2>
          </div>
          <div className="h-5 w-5 flex items-center justify-center text-text-muted hover:text-white transition-colors cursor-pointer">
            <Info className="h-4 w-4" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-1 px-3 rounded-2xl bg-white/3 border border-white/5 backdrop-blur-sm">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Total</span>
            <span className="text-sm font-black text-white">128.5 hrs</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Active</span>
            <span className="text-sm font-black text-cyan-400">84%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Daily Avg</span>
            <span className="text-sm font-black text-white">1.8 hrs</span>
          </div>
        </div>
      </div>

      <div 
        className="relative my-4 overflow-x-auto no-scrollbar"
        onMouseMove={handleMouseMove}
      >
        <motion.div 
          className="flex gap-1.5 min-w-max pb-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activityData.map((week, wIndex) => (
            <motion.div 
              key={wIndex} 
              className="flex flex-col gap-1.5"
              variants={columnVariants}
            >
              {week.map((day, dIndex) => (
                <div
                  key={dIndex}
                  className={`h-[11px] w-[11px] rounded-[3px] border cursor-crosshair transition-all duration-200 accelerate-transition ${levelColors[day.level]}`}
                  onMouseEnter={() => setHoveredCell(day)}
                  onMouseLeave={() => setHoveredCell(null)}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {hoveredCell && (
          <div 
            className="absolute z-50 px-3 py-1.5 rounded-lg bg-neutral-950 border border-border-card text-[11px] text-white pointer-events-none shadow-2xl transition-all duration-75 flex flex-col font-medium"
            style={{ 
              left: `${tooltipPos.x}px`, 
              top: `${tooltipPos.y}px` 
            }}
          >
            <span className="font-semibold text-cyan-400">
              {hoveredCell.hours > 0 ? `${hoveredCell.hours} hours study` : 'No study time'}
            </span>
            <span className="text-[9px] text-text-secondary">
              {hoveredCell.date}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex justify-between items-center select-none pt-2 border-t border-white/5">
        <span className="text-[10px] text-text-secondary font-medium">
          Last 6 months learning logs
        </span>
        
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-text-secondary uppercase font-bold tracking-wider mr-1">Less</span>
          <div className="h-2 w-2 rounded-[2px] bg-neutral-900 border border-white/2" />
          <div className="h-2 w-2 rounded-[2px] bg-cyan-950/40 border border-cyan-900/20" />
          <div className="h-2 w-2 rounded-[2px] bg-cyan-800/40 border border-cyan-700/20" />
          <div className="h-2 w-2 rounded-[2px] bg-cyan-600/50 border border-cyan-500/30" />
          <div className="h-2 w-2 rounded-[2px] bg-cyan-400/70 border border-cyan-300" />
          <span className="text-[9px] text-text-secondary uppercase font-bold tracking-wider ml-1">More</span>
        </div>
      </div>
    </article>
  );
}
