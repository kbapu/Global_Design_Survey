import React from 'react';
import { cn } from '../utils';

export function Pill({ 
  selected, 
  onClick, 
  children,
  className
}: { 
  selected: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border",
        selected 
          ? "border-black bg-black text-white shadow-sm" 
          : "border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50",
        className
      )}
    >
      {children}
    </button>
  );
}

export function RadioItem({
  selected,
  onClick,
  children
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200",
        selected
          ? "border-black bg-white shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-400"
      )}
    >
      <div className={cn(
        "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
        selected ? "border-black" : "border-gray-300"
      )}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
      </div>
      <span className="text-[15px] font-medium text-gray-900">{children}</span>
    </div>
  );
}
