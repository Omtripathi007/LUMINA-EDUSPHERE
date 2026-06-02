import React from 'react';
import { getCourses } from '@/lib/supabase/server';
import CoursesCatalog from '@/components/courses/courses-catalog';

export const revalidate = 0; // Force server evaluation on each request

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Info */}
      <header className="flex flex-col gap-1 select-none font-sans">
        <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
          Curriculum Catalog
        </h2>
        <p className="text-xs md:text-sm text-text-secondary font-medium">
          Review, filter, and track details of all your enrolled academic programs.
        </p>
      </header>

      {/* Catalog Render */}
      <CoursesCatalog courses={courses} />
    </div>
  );
}
