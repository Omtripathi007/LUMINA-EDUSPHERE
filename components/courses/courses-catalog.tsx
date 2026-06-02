'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Award, Filter } from 'lucide-react';
import CourseCard from '@/components/cards/course-card';
import { Course } from '@/types';

interface CoursesCatalogProps {
  courses: Course[];
}

type TabType = 'all' | 'in_progress' | 'completed';

export default function CoursesCatalog({ courses }: CoursesCatalogProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useMemo(() => {
    const total = courses.length;
    const completed = courses.filter(c => c.progress === 100).length;
    const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100).length;
    const avgProgress = total > 0 
      ? Math.round(courses.reduce((acc, curr) => acc + curr.progress, 0) / total) 
      : 0;

    return { total, completed, inProgress, avgProgress };
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      if (activeTab === 'in_progress') return course.progress > 0 && course.progress < 100;
      if (activeTab === 'completed') return course.progress === 100;
      return true;
    });
  }, [courses, activeTab, searchQuery]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        <div className="glass-card p-5 rounded-2xl flex items-center gap-4 border-white/4">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Total Modules</span>
            <span className="text-xl font-black text-white">{stats.total} Courses</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center gap-4 border-white/4">
          <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Clock className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Average Progress</span>
            <span className="text-xl font-black text-white">{stats.avgProgress}% Rate</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center gap-4 border-white/4">
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Award className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Certificates</span>
            <span className="text-xl font-black text-white">{stats.completed} Earned</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center w-full bg-white/2 p-3 rounded-2xl border border-white/4 backdrop-blur-md">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/3">
          {(['all', 'in_progress', 'completed'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-colors duration-250 cursor-pointer
                ${activeTab === tab ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="catalog-active-pill"
                  className="absolute inset-0 bg-white/5 border border-white/8 rounded-lg shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-black/40 border border-white/3 max-w-sm flex-grow">
          <Search className="h-4.5 w-4.5 text-text-muted" />
          <input
            type="text"
            placeholder="Search learning modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none w-full placeholder-text-muted"
          />
        </div>
      </div>

      <div className="w-full relative min-h-[300px]">
        {filteredCourses.length > 0 ? (
          <motion.div
            key={activeTab + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-12 gap-6 w-full"
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center w-full"
          >
            <div className="h-12 w-12 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-text-muted mb-4">
              <Filter className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">No courses match query</h3>
            <p className="text-xs text-text-secondary max-w-xs">
              Try adjusting your search criteria or toggling different status tabs.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
