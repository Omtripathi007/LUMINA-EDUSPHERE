'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Trophy } from 'lucide-react';

const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100 + 10,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 2,
}));

export default function HeroTile() {
  return (
    <article className="relative overflow-hidden rounded-3xl glass-card p-8 flex flex-col justify-between h-[280px] group saturate-125 transition-all duration-500 hover:border-white/10 hover:shadow-[0_0_50px_rgba(255,94,58,0.06)] col-span-12 lg:col-span-8 md:col-span-2">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-orange-600/15 via-red-600/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 accelerate-transition" />
      <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-r from-orange-400 to-amber-300 opacity-20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -120],
              x: [0, Math.sin(p.id) * 30],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full select-none">
        <div className="flex justify-between items-start">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 w-fit text-[11px] font-medium tracking-wide text-neutral-300 backdrop-blur-md mb-4"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              <span>TOP 3% OF ACADEMY</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                Alex
              </span>
            </h1>
            <p className="text-sm text-text-secondary font-medium">
              You're making incredible progress. Keep the momentum going!
            </p>
          </div>

          <motion.div 
            className="relative flex items-center gap-3 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-orange-500/20 px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(255,94,58,0.05)] overflow-hidden group/streak select-none"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-50 group-hover/streak:opacity-80 transition-opacity" />
            
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                filter: [
                  'drop-shadow(0 0 4px rgba(255,94,58,0.5))',
                  'drop-shadow(0 0 12px rgba(255,94,58,0.8))',
                  'drop-shadow(0 0 4px rgba(255,94,58,0.5))'
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-orange-500/10 border border-orange-500/30"
            >
              <Flame className="h-5.5 w-5.5 text-orange-500 fill-orange-500/20" />
            </motion.div>

            <div className="flex flex-col">
              <span className="text-2xl font-black text-white leading-none tracking-tight">
                14
              </span>
              <span className="text-[9px] font-bold text-orange-400 tracking-widest uppercase">
                DAY STREAK
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between items-end border-t border-white/5 pt-4 mt-auto">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Star className="h-4 w-4 text-cyan-400 fill-cyan-400/10" />
            <span>Current daily goal: 45m (92% completed today)</span>
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-orange-400">
            Next milestone in 6 days 🔥
          </span>
        </div>
      </div>
    </article>
  );
}
