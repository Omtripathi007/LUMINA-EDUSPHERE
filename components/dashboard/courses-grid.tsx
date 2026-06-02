import React from 'react';
import { getCourses } from '@/lib/supabase/server';
import CoursesList from './courses-list';

export const revalidate = 0;

export default async function CoursesGrid() {
  const courses = await getCourses();
  
  return <CoursesList courses={courses} />;
}
