'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/components/cards/course-card';
import { Course } from '@/types';

interface CoursesListProps {
  courses: Course[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function CoursesList({ courses }: CoursesListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-12 col-span-12 gap-6"
    >
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </motion.div>
  );
}
