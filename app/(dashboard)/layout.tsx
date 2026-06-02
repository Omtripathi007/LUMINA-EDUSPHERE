import React from 'react';
import Sidebar from '@/components/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <main 
        className="relative z-10 w-full min-h-screen transition-all duration-300
          px-4 pt-6 pb-24
          md:pl-28 md:pr-6 md:py-8
          lg:pl-[304px] lg:pr-8"
      >
        {children}
      </main>
    </>
  );
}
