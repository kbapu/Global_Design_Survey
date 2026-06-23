import React from 'react';
import { StepProps } from '../../types';
import { Pill } from '../ui';
import { ArrowRight } from 'lucide-react';

const HIRE_ROLES = [
  "UX Engineer", "UX / Product Designer", "Researcher / Behavioral Scientist",
  "AI Business Analyst", "Product Owner / PM", "Front-end Developer", "Content Strategist",
  "Domain / Industry Specialist", "Go-to-market / Growth", "Design Systems Designer"
];

export function Step1({ data, updateData, onNext, onBack }: StepProps) {
  const currentSelections = data.topRoles || [];
  const isValid = currentSelections.length > 0;

  const toggleRole = (role: string) => {
    if (currentSelections.includes(role)) {
      updateData({ topRoles: currentSelections.filter(r => r !== role) });
    } else if (currentSelections.length < 3) {
      updateData({ topRoles: [...currentSelections, role] });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-2">Question 1 of 4</h2>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
          If you received funding tomorrow and could only hire 3 people for your design team — what roles would they be?
        </h3>
        <p className="text-gray-500 mb-8">Select up to 3. Choose what you'd actually hire, not what sounds right.</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {HIRE_ROLES.map(role => (
            <Pill
              key={role}
              selected={currentSelections.includes(role)}
              onClick={() => toggleRole(role)}
              className={!currentSelections.includes(role) && currentSelections.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}
            >
              {role}
            </Pill>
          ))}
        </div>

        <div>
          <label className="block text-[15px] font-medium text-gray-900 mb-3">Not in the list? Add it:</label>
          <input 
            type="text"
            placeholder="e.g. Service Designer, AI Ethicist..."
            className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400"
            value={data.customRole || ""}
            onChange={(e) => updateData({ customRole: e.target.value })}
          />
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
          <span className="text-sm text-gray-400">Question 2 of 4</span>
          <button 
            onClick={onNext}
            disabled={!isValid && !data.customRole}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
