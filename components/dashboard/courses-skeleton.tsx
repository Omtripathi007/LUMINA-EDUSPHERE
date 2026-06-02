import React from 'react';

export default function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-12 col-span-12 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="col-span-12 md:col-span-1 lg:col-span-3 h-[210px] rounded-3xl bg-neutral-900/60 shimmer border border-white/3 p-6 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="h-11 w-11 rounded-xl bg-neutral-800" />
            <div className="h-7 w-7 rounded-full bg-neutral-850" />
          </div>
          <div className="flex flex-col gap-4 mt-auto">
            <div className="h-6 w-4/5 rounded-lg bg-neutral-800" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="h-3 w-20 rounded bg-neutral-800/40" />
                <div className="h-3 w-8 rounded bg-neutral-800" />
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-900/80 border border-white/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
