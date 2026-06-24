import React from 'react';
import { Clock, MessageSquare, Globe } from 'lucide-react';

interface SurveyThumbnailProps {
  selectedRegion?: string;
}

export function SurveyThumbnail({ selectedRegion }: SurveyThumbnailProps) {
  // Determine if a specific region is active
  const isEuropeActive = selectedRegion === 'Europe';
  const isAsiaActive = selectedRegion === 'Asia Pacific';

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#030712] border border-gray-800 shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center mb-8 select-none">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Text Panel */}
      <div className="w-full md:w-1/2 flex flex-col h-full justify-between z-10">
        <div>
          {/* Tag */}
          <div className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#3b82f6] uppercase mb-3">
            Global Design Survey · 2026
          </div>
          
          {/* Main bold title */}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none uppercase text-white mb-4 font-sans">
            No One Hired <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa]">
              A UX Designer
            </span>
          </h2>

          {/* Subtitle / context */}
          <p className="text-gray-300 text-sm font-medium leading-relaxed mb-1.5">
            New York answered 4 uncomfortable questions about AI hiring.
          </p>
          <p className="text-gray-400 text-sm font-semibold">
            Will <span className={`${isAsiaActive ? 'text-[#c084fc] underline decoration-2' : 'text-[#3b82f6]'} transition-all`}>Asia</span> and{' '}
            <span className={`${isEuropeActive ? 'text-[#60a5fa] underline decoration-2' : 'text-[#a855f7]'} transition-all`}>Europe</span> agree?
          </p>
        </div>

        {/* Info stats line */}
        <div className="flex flex-wrap gap-4 items-center border-t border-gray-800/80 pt-4 mt-8 md:mt-12">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
            <Clock className="w-4 h-4 text-[#3b82f6]" />
            <span>3 min</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
            <MessageSquare className="w-4 h-4 text-[#3b82f6]" />
            <span>4 questions</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
            <Globe className="w-4 h-4 text-[#3b82f6]" />
            <span>Global Results</span>
          </div>
        </div>
      </div>

      {/* Right Visual Panel - Interactive Globe & Callouts */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[220px] md:min-h-[260px] z-10 overflow-visible">
        {/* Globe Visualization */}
        <div className="w-48 h-48 rounded-full border border-gray-800 relative bg-gradient-to-b from-[#080e22] to-[#010309] shadow-[inset_0_0_30px_rgba(59,130,246,0.1)] flex items-center justify-center">
          {/* Animated longitudinal circles */}
          <div className="absolute inset-2 rounded-full border border-dashed border-gray-800/60 animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-6 rounded-full border border-dotted border-gray-800/40 animate-[spin_20s_linear_infinite_reverse]" />
          
          {/* Wireframe lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Grid Line Latitude */}
            <path d="M 10 50 Q 50 30 90 50" fill="none" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2,2" />
            <path d="M 10 50 Q 50 70 90 50" fill="none" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="3,3" />

            {/* Glowing Connection curves */}
            {/* NY to Europe Arc */}
            <path 
              d="M 25 70 Q 40 45 55 50" 
              fill="none" 
              stroke="url(#arcGradientNY)" 
              strokeWidth="1.2" 
              strokeDasharray="4,4"
              className="animate-dash"
            />
            {/* Europe to Asia Arc */}
            <path 
              d="M 55 50 Q 68 40 80 35" 
              fill="none" 
              stroke="url(#arcGradientEU)" 
              strokeWidth="1.2" 
              strokeDasharray="4,4"
              className="animate-dash"
            />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="arcGradientNY" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="arcGradientEU" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* New York Marker */}
          <div className="absolute left-[25%] top-[70%] transform -translate-x-1/2 -translate-y-1/2 z-20">
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-[#14b8a6]/40 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14b8a6]" />
          </div>

          {/* Europe Marker */}
          <div className="absolute left-[55%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 z-20">
            <span className={`absolute inline-flex rounded-full bg-[#3b82f6]/40 animate-ping ${isEuropeActive ? 'h-6 w-6' : 'h-4 w-4'}`} />
            <span className={`relative inline-flex rounded-full bg-[#3b82f6] ${isEuropeActive ? 'h-2.5 w-2.5' : 'h-2 w-2'}`} />
          </div>

          {/* Asia Marker */}
          <div className="absolute left-[80%] top-[35%] transform -translate-x-1/2 -translate-y-1/2 z-20">
            <span className={`absolute inline-flex rounded-full bg-[#a855f7]/40 animate-ping ${isAsiaActive ? 'h-6 w-6' : 'h-4 w-4'}`} />
            <span className={`relative inline-flex rounded-full bg-[#a855f7] ${isAsiaActive ? 'h-2.5 w-2.5' : 'h-2 w-2'}`} />
          </div>
        </div>

        {/* --- Callout Cards absolute-positioned relative to Right Panel --- */}
        
        {/* NEW YORK CALLOUT CARD */}
        <div className="absolute left-[-5%] bottom-[-2%] bg-[#061f23]/95 border border-[#14b8a6]/40 rounded-xl p-2 flex items-center gap-2.5 shadow-[0_4px_16px_rgba(20,184,166,0.15)] backdrop-blur-xs transition-transform duration-300 hover:scale-105">
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center text-xs text-[#14b8a6]">
            🗽
          </div>
          <div className="flex flex-col pr-1">
            <span className="text-[9px] font-mono font-bold tracking-wider text-gray-200">NEW YORK</span>
            <span className="text-[8px] text-[#14b8a6] font-semibold flex items-center gap-0.5">
              Already answered. <span className="text-[10px] font-bold">✓</span>
            </span>
          </div>
        </div>

        {/* EUROPE CALLOUT CARD */}
        <div className={`absolute left-[5%] top-[-10%] bg-[#091e3a]/95 border rounded-xl p-2 flex items-center gap-2.5 shadow-[0_4px_16px_rgba(59,130,246,0.15)] backdrop-blur-xs transition-all duration-300 hover:scale-105 ${
          isEuropeActive ? 'border-[#3b82f6] scale-105 ring-1 ring-[#3b82f6]/30 bg-[#0c2e5a]/95' : 'border-[#3b82f6]/30'
        }`}>
          <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
            isEuropeActive ? 'bg-[#3b82f6]/20 text-white animate-bounce' : 'bg-[#3b82f6]/10 text-[#3b82f6]'
          }`}>
            🗼
          </div>
          <div className="flex flex-col pr-1">
            <span className="text-[9px] font-mono font-bold tracking-wider text-gray-200">EUROPE</span>
            {isEuropeActive ? (
              <span className="text-[8px] text-[#60a5fa] font-bold animate-pulse">Answering now...</span>
            ) : (
              <span className="text-[8px] text-gray-400 font-medium">Your voice is missing.</span>
            )}
          </div>
        </div>

        {/* ASIA CALLOUT CARD */}
        <div className={`absolute right-[0%] top-[15%] bg-[#211035]/95 border rounded-xl p-2 flex items-center gap-2.5 shadow-[0_4px_16px_rgba(168,85,247,0.15)] backdrop-blur-xs transition-all duration-300 hover:scale-105 ${
          isAsiaActive ? 'border-[#a855f7] scale-105 ring-1 ring-[#a855f7]/30 bg-[#341656]/95' : 'border-[#a855f7]/30'
        }`}>
          <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
            isAsiaActive ? 'bg-[#a855f7]/20 text-white animate-bounce' : 'bg-[#a855f7]/10 text-[#a855f7]'
          }`}>
            ⛩️
          </div>
          <div className="flex flex-col pr-1">
            <span className="text-[9px] font-mono font-bold tracking-wider text-gray-200">ASIA</span>
            {isAsiaActive ? (
              <span className="text-[8px] text-[#c084fc] font-bold animate-pulse">Answering now...</span>
            ) : (
              <span className="text-[8px] text-gray-400 font-medium">Your voice is missing.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
