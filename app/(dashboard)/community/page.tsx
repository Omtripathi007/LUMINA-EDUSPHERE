'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Flame, MessageSquare, Plus, ExternalLink, Hash, ArrowUpRight, User } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  streak: number;
  isSelf?: boolean;
}

const LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Sarah Jenkins', streak: 28 },
  { rank: 2, name: 'Marcus Aurelius', streak: 21 },
  { rank: 3, name: 'Alex Mercer (You)', streak: 14, isSelf: true },
  { rank: 4, name: 'Sofia Rodriguez', streak: 12 },
  { rank: 5, name: 'Dave Chappelle', streak: 9 },
];

const STUDY_GROUPS = [
  { id: 1, title: 'Algorithms Room 4', active: 6, subject: 'Computer Science' },
  { id: 2, title: 'React Patterns review', active: 3, subject: 'Frontend' },
  { id: 3, title: 'Supabase SQL Debuggers', active: 9, subject: 'Databases' },
];

const DISCUSSION_THREADS = [
  { id: 1, title: 'Why are Next.js 15 Server Components caching queries by default?', author: 'John Doe', replies: 14, tag: 'Nextjs' },
  { id: 2, title: 'Help with database indexing on UUID primary keys', author: 'Clara Oswald', replies: 8, tag: 'Supabase' },
  { id: 3, title: 'Framer Motion layoutId animation jumps during list reordering', author: 'Devin', replies: 21, tag: 'Animations' },
];

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 }
  },
};

export default function CommunityPage() {
  return (
    <div className="w-full flex flex-col gap-6 select-none font-sans">
      {/* Header Panel */}
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
          Academy Community
        </h2>
        <p className="text-xs md:text-sm text-text-secondary font-medium">
          Connect with peer engineers, coordinate study groups, and track leaderboard ranks.
        </p>
      </header>

      {/* Bento Grid Community Blocks */}
      <div className="grid grid-cols-12 gap-6 w-full">
        
        {/* Left Column: Streaks Leaderboard (Spans 5 cols on desktop) */}
        <div className="col-span-12 lg:col-span-5 glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden flex flex-col justify-between h-[420px]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Flame className="h-4.5 w-4.5 text-orange-500" />
              <h3 className="text-sm font-bold text-white tracking-wider">DAILY STREAK LEADERBOARD</h3>
            </div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
              Weekly Update
            </span>
          </div>

          {/* Leaderboard Table List */}
          <motion.div 
            className="flex flex-col gap-3 flex-grow overflow-y-auto pr-1"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {LEADERBOARD.map((user) => (
              <motion.div
                key={user.rank}
                variants={itemVariants}
                className={`flex items-center gap-4 px-4 py-2.5 rounded-xl border accelerate-transition hover:scale-[1.01]
                  ${user.isSelf 
                    ? 'bg-orange-500/10 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.05)]' 
                    : 'bg-white/2 border-white/3 hover:border-white/8'}`}
              >
                {/* Rank */}
                <span className={`text-xs font-black w-4 text-center
                  ${user.rank === 1 ? 'text-amber-400' : user.rank === 2 ? 'text-neutral-300' : user.rank === 3 ? 'text-orange-400' : 'text-text-muted'}`}
                >
                  {user.rank}
                </span>

                {/* Avatar Placeholder */}
                <div className="h-8 w-8 rounded-full bg-neutral-800 border border-white/5 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-neutral-400" />
                </div>

                {/* Name */}
                <span className={`text-xs font-bold ${user.isSelf ? 'text-orange-400' : 'text-white'}`}>
                  {user.name}
                </span>

                {/* Streak Count */}
                <div className="flex items-center gap-1.5 ml-auto text-xs font-black text-white bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                  <Flame className={`h-3.5 w-3.5 ${user.isSelf ? 'text-orange-500' : 'text-neutral-400'}`} />
                  <span>{user.streak}d</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Study Rooms and Forums (Spans 7 cols on desktop) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 h-[420px]">
          
          {/* Study Rooms (Top box) */}
          <div className="glass-card rounded-3xl p-5 border-white/5 relative overflow-hidden flex flex-col justify-between flex-1">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white tracking-wider">COLLABORATIVE STUDY ROOMS</h3>
              </div>
              <button className="flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-white border border-white/5 cursor-pointer">
                <Plus className="h-3 w-3" />
                <span>Create Room</span>
              </button>
            </div>

            {/* Rooms Cards Horizontal Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STUDY_GROUPS.map((group) => (
                <div 
                  key={group.id} 
                  className="bg-black/40 border border-white/4 p-4 rounded-2xl flex flex-col justify-between hover:border-cyan-500/20 cursor-pointer accelerate-transition group"
                >
                  <div>
                    <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest block mb-1">
                      {group.subject}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {group.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] font-semibold text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                    <span>{group.active} online</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Forums (Bottom box) */}
          <div className="glass-card rounded-3xl p-5 border-white/5 relative overflow-hidden flex flex-col justify-between flex-1">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-purple-400" />
                <h3 className="text-sm font-bold text-white tracking-wider">TECHNICAL DISCUSSIONS</h3>
              </div>
            </div>

            {/* Forums row feeds */}
            <div className="flex flex-col gap-2">
              {DISCUSSION_THREADS.map((thread) => (
                <div 
                  key={thread.id} 
                  className="bg-white/2 hover:bg-white/4 border border-white/3 hover:border-white/5 px-4 py-2.5 rounded-xl flex items-center justify-between cursor-pointer accelerate-transition group"
                >
                  <div className="flex items-center gap-3">
                    <Hash className="h-3.5 w-3.5 text-text-muted group-hover:text-purple-400 transition-colors" />
                    <div className="flex flex-col">
                      <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 max-w-[260px] sm:max-w-md">
                        {thread.title}
                      </h4>
                      <span className="text-[9px] text-text-secondary font-medium">
                        By {thread.author} • {thread.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary">
                    <span>{thread.replies} posts</span>
                    <ArrowUpRight className="h-3 w-3 text-text-muted group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
