'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Braces, Layers, Database, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Course } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Braces,
  Layers,
  Database,
};

const themeMap: Record<string, {
  accent: string;
  glow: string;
  gradient: string;
  progressGradient: string;
  progressGlow: string;
}> = {
  Code2: {
    accent: 'text-orange-400',
    glow: 'group-hover:shadow-[0_0_50px_rgba(239,68,68,0.06)]',
    gradient: 'from-orange-500/8 via-red-500/3 to-transparent',
    progressGradient: 'from-orange-500 to-red-500',
    progressGlow: 'shadow-[0_0_12px_rgba(249,115,22,0.4)]',
  },
  Braces: {
    accent: 'text-sky-400',
    glow: 'group-hover:shadow-[0_0_50px_rgba(14,165,233,0.06)]',
    gradient: 'from-sky-500/8 via-blue-500/3 to-transparent',
    progressGradient: 'from-sky-400 to-blue-600',
    progressGlow: 'shadow-[0_0_12px_rgba(56,189,248,0.4)]',
  },
  Layers: {
    accent: 'text-purple-400',
    glow: 'group-hover:shadow-[0_0_50px_rgba(168,85,247,0.06)]',
    gradient: 'from-purple-500/8 via-pink-500/3 to-transparent',
    progressGradient: 'from-purple-500 to-pink-500',
    progressGlow: 'shadow-[0_0_12px_rgba(168,85,247,0.4)]',
  },
  Database: {
    accent: 'text-emerald-400',
    glow: 'group-hover:shadow-[0_0_50px_rgba(16,185,129,0.06)]',
    gradient: 'from-emerald-500/8 via-teal-500/3 to-transparent',
    progressGradient: 'from-emerald-400 to-teal-500',
    progressGlow: 'shadow-[0_0_12px_rgba(52,211,153,0.4)]',
  },
};

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const IconComponent = iconMap[course.icon_name] || HelpCircle;
  const theme = themeMap[course.icon_name] || {
    accent: 'text-neutral-400',
    glow: 'group-hover:shadow-[0_0_50px_rgba(255,255,255,0.02)]',
    gradient: 'from-neutral-500/5 to-transparent',
    progressGradient: 'from-neutral-400 to-neutral-600',
    progressGlow: 'shadow-none',
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      className={`group relative overflow-hidden rounded-3xl glass-card p-6 flex flex-col justify-between h-[210px] saturate-110 cursor-pointer accelerate-transition ${theme.glow} col-span-12 md:col-span-1 lg:col-span-3`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      aria-label={`Course: ${course.title}, Progress: ${course.progress}%`}
    >
      <div className={`absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl ${theme.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-110 accelerate-transition`} />
      
      <div className="absolute inset-0 border border-white/0 rounded-3xl group-hover:border-white/5 transition-colors duration-500 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start w-full">
        <div className={`h-11 w-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/10 accelerate-transition ${theme.accent}`}>
          <IconComponent className="h-5.5 w-5.5" />
        </div>
        
        <div className="h-7 w-7 rounded-full bg-white/0 flex items-center justify-center group-hover:bg-white/5 group-hover:scale-105 transition-all duration-300">
          <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-white transition-colors" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-end w-full select-none mt-auto">
        <h3 className="text-base font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors duration-300 mb-4 line-clamp-1">
          {course.title}
        </h3>

        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
            Course Completion
          </span>
          <span className="text-sm font-black text-white">
            {course.progress}%
          </span>
        </div>

        <div className="h-2 w-full bg-neutral-900/60 rounded-full overflow-hidden border border-white/3 backdrop-blur-sm">
          <motion.div
            className={`h-full bg-gradient-to-r ${theme.progressGradient} ${theme.progressGlow} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
              delay: index * 0.1,
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}
