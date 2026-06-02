'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to server-side telemetry or console
    console.error('Unhandled app-router boundary error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full text-center p-6 select-none" role="alert">
      {/* Visual Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Error Card Panel */}
      <div className="glass-card max-w-md w-full rounded-3xl p-8 border-red-500/15 shadow-[0_0_50px_rgba(239,68,68,0.04)] relative overflow-hidden flex flex-col items-center gap-6">
        
        {/* Warning Icon with pulse border */}
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400">
          <AlertCircle className="h-8 w-8 animate-pulse" />
        </div>

        {/* Warning Text */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Something went wrong
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            We encountered a database query error or rendering failure while updating your learning feed.
          </p>
          {error.digest && (
            <code className="text-[10px] text-text-muted mt-2 select-all font-mono bg-white/2 px-2 py-1 rounded">
              Ref digest: {error.digest}
            </code>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 active:scale-98 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/10"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try again</span>
        </button>
      </div>
    </div>
  );
}
