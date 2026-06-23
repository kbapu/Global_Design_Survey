import React from 'react';
import { StepProps } from '../../types';
import { Pill } from '../ui';
import { ArrowRight } from 'lucide-react';

const NOT_HIRED = [
  "Junior Designer", "Junior Researcher", "Junior Front-end Developer", "Content Writer",
  "Graphic Designer", "Motion Designer", "UI Designer", "Copywriter / UX Writer",
  "None — I'd still hire all of these"
];

const QUALITIES = [
  "Curiosity & growth mindset", "Strategic thinking", "AI tool fluency", "Domain expertise",
  "Systems thinking", "Customer empathy", "Self-directed learning", "Ability to direct AI output"
];

export function Step2({ data, updateData, onNext, onBack }: StepProps) {
  const currentNotHired = data.rolesNotHired || [];
  const currentQualities = data.qualities || [];
  
  const isValid = currentNotHired.length > 0 && currentQualities.length > 0;

  const toggleList = (item: string, list: string[], key: 'rolesNotHired' | 'qualities') => {
    if (item === "None — I'd still hire all of these" && key === 'rolesNotHired') {
      updateData({ rolesNotHired: [item] });
      return;
    }
    
    let newList = [...list];
    
    // Clear the "None" option if selecting something else
    if (key === 'rolesNotHired' && newList.includes("None — I'd still hire all of these")) {
       newList = [];
    }

    if (newList.includes(item)) {
      newList = newList.filter(i => i !== item);
    } else {
      newList.push(item);
    }
    updateData({ [key]: newList });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-2">Question 2 of 4</h2>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
          What role would you NOT hire today that you would have hired without hesitation 3 years ago?
        </h3>
        <p className="text-gray-500 mb-6">Select all that apply.</p>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {NOT_HIRED.map(role => (
            <Pill
              key={role}
              selected={currentNotHired.includes(role)}
              onClick={() => toggleList(role, currentNotHired, 'rolesNotHired')}
            >
              {role}
            </Pill>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
          What do you look for instead of title or seniority?
        </h3>
        <p className="text-gray-500 mb-6">The qualities that actually make someone hireable today.</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {QUALITIES.map(q => (
            <Pill
              key={q}
              selected={currentQualities.includes(q)}
              onClick={() => toggleList(q, currentQualities, 'qualities')}
            >
              {q}
            </Pill>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-900 hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Question 3 of 4</span>
          <button 
            onClick={onNext}
            disabled={!isValid}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
