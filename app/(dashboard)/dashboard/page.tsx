import React, { Suspense } from 'react';
import HeroTile from '@/components/dashboard/hero-tile';
import ActivityTile from '@/components/dashboard/activity-tile';
import CoursesGrid from '@/components/dashboard/courses-grid';
import CoursesSkeleton from '@/components/dashboard/courses-skeleton';

export const revalidate = 0;

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <header className="flex flex-col gap-1 select-none">
        <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
          Overview
        </h2>
        <p className="text-xs md:text-sm text-text-secondary font-medium">
          Monitor your programming progress and learning milestones.
        </p>
      </header>

      <section 
        className="grid grid-cols-12 gap-6 w-full"
        aria-label="Dashboard metrics and courses"
      >
        <HeroTile />
        <ActivityTile />

        <Suspense fallback={<CoursesSkeleton />}>
          <CoursesGrid />
        </Suspense>
      </section>
    </div>
  );
}
