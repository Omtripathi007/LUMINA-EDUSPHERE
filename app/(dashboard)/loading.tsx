import React from 'react';

export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-6" aria-busy="true" aria-live="polite">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-2 select-none">
        <div className="h-6 w-32 rounded-lg bg-neutral-900/60 shimmer border border-white/3" />
        <div className="h-4 w-56 rounded-md bg-neutral-900/40 shimmer" />
      </div>

      {/* Bento Grid Skeleton */}
      <div className="grid grid-cols-12 gap-6 w-full">
        {/* Hero Card Skeleton */}
        <div className="col-span-12 lg:col-span-8 md:col-span-2 h-[280px] rounded-3xl bg-neutral-900/60 shimmer border border-white/3 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <div className="h-6 w-36 rounded-full bg-neutral-800/80" />
              <div className="h-10 w-64 rounded-xl bg-neutral-800" />
              <div className="h-4 w-80 rounded-lg bg-neutral-800/40" />
            </div>
            <div className="h-14 w-28 rounded-2xl bg-neutral-800" />
          </div>
          <div className="h-5 w-72 rounded bg-neutral-800/30" />
        </div>

        {/* Activity Card Skeleton */}
        <div className="col-span-12 lg:col-span-4 md:col-span-2 h-[280px] rounded-3xl bg-neutral-900/60 shimmer border border-white/3 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="h-5 w-40 rounded bg-neutral-800" />
            <div className="h-5 w-5 rounded bg-neutral-800/40" />
          </div>
          <div className="h-12 w-full rounded-2xl bg-neutral-800/50" />
          <div className="h-[91px] w-full rounded-lg bg-neutral-850/60 border border-white/2" />
          <div className="flex justify-between items-center">
            <div className="h-3.5 w-32 rounded bg-neutral-800/30" />
            <div className="h-3.5 w-44 rounded bg-neutral-800/30" />
          </div>
        </div>

        {/* 4 Course Card Skeletons */}
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
    </div>
  );
}
