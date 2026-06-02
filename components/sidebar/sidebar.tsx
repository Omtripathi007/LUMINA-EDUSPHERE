'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BarChart3, 
  Users, 
  Settings, 
  Terminal, 
  LogOut,
  User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'courses', label: 'Courses', icon: GraduationCap, href: '/courses' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { id: 'community', label: 'Community', icon: Users, href: '/community' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside 
        className="fixed z-40 glass-card accelerate-transition
          bottom-0 left-0 right-0 h-16 w-full flex flex-row items-center px-4 justify-around border-t border-border-card
          md:top-0 md:bottom-0 md:left-0 md:w-20 md:h-screen md:flex-col md:justify-between md:py-8 md:px-0 md:border-r md:border-t-0
          lg:w-[280px] lg:px-6 lg:items-stretch"
        aria-label="Sidebar navigation"
      >
        <div className="hidden md:flex items-center gap-3 px-4 lg:px-2 select-none">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <Terminal className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="hidden lg:inline text-lg font-semibold tracking-wider bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            LUMINA
          </span>
        </div>

        <nav className="flex w-full flex-row justify-around md:flex-col md:gap-2 md:justify-start md:px-2 lg:px-0 lg:mt-8">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.id === 'dashboard' && pathname.startsWith('/dashboard'));

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-colors select-none group
                  ${isActive ? 'text-white' : 'text-text-secondary hover:text-white'}
                  md:justify-center lg:justify-start`}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-0 bg-white/5 rounded-xl border border-white/8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      mass: 0.8,
                    }}
                  />
                )}

                <div className="relative flex items-center justify-center">
                  <Icon className={`h-[22px] w-[22px] transition-transform duration-300 group-hover:scale-105
                    ${isActive ? 'text-cyan-400' : 'text-text-secondary group-hover:text-white'}`} 
                  />
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  )}
                </div>

                <span className="text-[11px] md:hidden lg:inline lg:text-sm font-medium tracking-wide">
                  {item.label}
                </span>

                <div className="hidden md:group-hover:block lg:group-hover:hidden absolute left-24 px-3 py-1.5 rounded-lg bg-neutral-900 border border-border-card text-xs text-white whitespace-nowrap shadow-xl pointer-events-none z-50">
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex flex-col items-center lg:items-stretch gap-4 px-2 lg:px-0">
          <hr className="w-full border-border-card hidden lg:block" />
          
          <Link 
            href="/" 
            className="flex items-center gap-3 p-2 rounded-xl text-text-secondary hover:text-white cursor-pointer transition-colors group w-full"
            aria-label="Log out"
          >
            <div className="h-8 w-8 rounded-full bg-neutral-800 border border-border-card flex items-center justify-center group-hover:border-white/20 transition-all duration-300 shrink-0">
              <User className="h-4 w-4 text-neutral-400" />
            </div>
            <div className="hidden lg:flex flex-col select-none">
              <span className="text-xs font-semibold text-white">Alex Mercer</span>
              <span className="text-[10px] text-text-secondary">Student Account</span>
            </div>
            <LogOut className="hidden lg:block h-4 w-4 ml-auto text-text-secondary group-hover:text-red-400 transition-colors" />
          </Link>
        </div>
      </aside>
    </>
  );
}
