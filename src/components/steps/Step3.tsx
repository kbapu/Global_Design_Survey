import React from 'react';
import { StepProps } from '../../types';
import { Pill } from '../ui';
import { ArrowRight } from 'lucide-react';

const AI_CAPABILITIES = [
  "UI / visual design", "Image generation", "UX writing & copy", "Content summarization",
  "Front-end coding", "Desk / secondary research", "Email drafting & comms", 
  "Workflow & admin automation", "Data analysis & synthesis", 
  "None yet — AI still needs a specialist"
];

export function Step3({ data, updateData, onNext, onBack }: StepProps) {
  const currentAi = data.aiCapabilities || [];
  const isValid = currentAi.length > 0;

  const toggleItem = (item: string) => {
    let newList = [...currentAi];
    
    if (item === "None yet — AI still needs a specialist") {
      updateData({ aiCapabilities: [item] });
      return;
    }
    
    if (newList.includes("None yet — AI still needs a specialist")) {
      newList = [];
    }

    if (newList.includes(item)) {
      newList = newList.filter(i => i !== item);
    } else {
      newList.push(item);
    }
    updateData({ aiCapabilities: newList });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-2">Question 3 of 4</h2>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
          What is AI already doing well enough that you no longer need a specialist?
        </h3>
        <p className="text-gray-500 mb-8">Select all that apply.</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {AI_CAPABILITIES.map(item => (
            <Pill
              key={item}
              selected={currentAi.includes(item)}
              onClick={() => toggleItem(item)}
            >
              {item}
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
          <span className="text-sm text-gray-400">Question 4 of 4</span>
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
