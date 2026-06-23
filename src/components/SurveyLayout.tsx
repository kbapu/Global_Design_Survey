import React from 'react';

export function SurveyHeader() {
  return (
    <div className="mb-12">
      <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
        Global Design Survey · 2026
      </div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
        Who gets hired first in an AI-native design org?
      </h1>
      <p className="text-gray-600 text-lg">
        4 questions · 3 minutes · Results shared globally across Asia, Europe & Americas
      </p>
    </div>
  );
}

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full h-1 bg-gray-200 mb-10 overflow-hidden">
      <div 
        className="h-full bg-blue-500 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
