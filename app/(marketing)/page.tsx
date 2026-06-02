'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Terminal, 
  ArrowRight, 
  Code2, 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  Lock,
  ArrowUpRight,
  Tv
} from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    // Simulate authentication lag
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleDemoLogin = () => {
    setIsSubmitting(true);
    setEmail('alex.mercer@lumina.edu');
    setPassword('••••••••••••');
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-bg-dark text-text-primary">
      {/* 1. Animated Floating Glass Elements (Background Parallax Depth) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glow Spheres */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/10 to-pink-500/5 rounded-full blur-[120px]" />
        
        {/* Floating animated boxes */}
        <motion.div
          className="absolute top-1/4 left-12 w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/3 border border-white/5 backdrop-blur-[2px]"
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[38%] w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/5 to-amber-500/3 border border-white/5 backdrop-blur-[2px]"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -15, 0],
            scale: [0.95, 1.02, 0.95]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/3 right-[42%] w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500/5 to-pink-500/3 border border-white/5 backdrop-blur-[2px]"
          animate={{
            y: [-25, 20, -25],
            rotate: [0, 20, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />
      </div>

      {/* 2. Top Header Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 select-none">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-wider bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
            LUMINA
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <span className="text-text-secondary hover:text-white cursor-pointer transition-colors hidden sm:inline">Features</span>
          <span className="text-text-secondary hover:text-white cursor-pointer transition-colors hidden sm:inline">Curriculum</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
          >
            <GithubIcon className="h-4.5 w-4.5" />
          </a>
        </div>
      </header>

      {/* 3. Main Landing Section: Split Grid Hero & Login */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-12 gap-12 items-center flex-grow">
        {/* Left Column: Headline & Visual Premium Widgets */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit text-[11px] font-semibold tracking-wider text-cyan-300 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>PLATFORM IS IN ACTIVE BETA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none"
          >
            Master engineering.<br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              One day at a time.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-medium"
          >
            Lumina is a premium development academy. Set daily goals, trace your weekly metrics, and climb the leaderboard with zero distraction.
          </motion.p>

          {/* Interactive animated preview widget ("animated box") */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card max-w-md p-5 rounded-2xl border-white/5 relative overflow-hidden select-none group mt-4 hidden sm:block saturate-110"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex gap-4 items-center mb-4">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                <Code2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Daily Coding Challenge</span>
                <span className="text-[10px] text-text-secondary">Progress: 12 / 15 chapters</span>
              </div>
              <span className="ml-auto text-xs font-black text-white">80%</span>
            </div>
            
            {/* Animated bar indicator in hero visual */}
            <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/2">
              <motion.div 
                className="h-full bg-cyan-400"
                animate={{ width: ['0%', '80%', '80%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Premium Sign-in Card */}
        <div className="col-span-12 lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
            className="w-full max-w-[420px] glass-card rounded-3xl p-8 relative border-white/5 shadow-[0_0_50px_rgba(0,113,227,0.03)]"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Access Academy
              </h2>
              <p className="text-xs text-text-secondary font-medium">
                Log in to enter your personalized dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  Email Address
                </label>
                <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl bg-black/40 border transition-all duration-300
                  ${activeInput === 'email' ? 'border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.1)]' : 'border-white/5 hover:border-white/10'}`}
                >
                  <Mail className={`h-4.5 w-4.5 transition-colors ${activeInput === 'email' ? 'text-cyan-400' : 'text-text-muted'}`} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setActiveInput('email')}
                    onBlur={() => setActiveInput(null)}
                    required
                    disabled={isSubmitting}
                    className="bg-transparent text-sm text-white focus:outline-none w-full placeholder-text-muted"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5 relative">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                    Password
                  </label>
                  <span className="text-[10px] font-medium text-cyan-400 hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl bg-black/40 border transition-all duration-300
                  ${activeInput === 'password' ? 'border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.1)]' : 'border-white/5 hover:border-white/10'}`}
                >
                  <Lock className={`h-4.5 w-4.5 transition-colors ${activeInput === 'password' ? 'text-cyan-400' : 'text-text-muted'}`} />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setActiveInput('password')}
                    onBlur={() => setActiveInput(null)}
                    required
                    disabled={isSubmitting}
                    className="bg-transparent text-sm text-white focus:outline-none w-full placeholder-text-muted"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 active:scale-98 transition-all duration-200 shadow-lg hover:shadow-white/5 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-4 items-center select-none">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">or test the flow</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            {/* Fast Demo login bypass */}
            <button
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white font-medium text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <span>Quick Demo Access</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-text-secondary" />
            </button>
          </motion.div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 text-xs text-text-secondary">
        <span>© 2026 Lumina. Premium engineering education modules.</span>
        <div className="flex gap-4">
          <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
        </div>
      </footer>
    </div>
  );
}
