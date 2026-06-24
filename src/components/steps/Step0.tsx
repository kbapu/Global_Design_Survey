import React from 'react';
import { StepProps } from '../../types';
import { RadioItem } from '../ui';
import { ArrowRight } from 'lucide-react';
import { SurveyThumbnail } from '../SurveyThumbnail';

const REGIONS = [
  "North America", "South America", "Europe", "Asia Pacific", "Middle East", "Africa"
];

const ROLES = [
  "Design leader / Head of Design / VP / CDO",
  "Product leader / CPO / Head of Product",
  "Senior / Principal designer or researcher",
  "Founder / C-suite",
  "Other design / product professional"
];

export function Step0({ data, updateData, onNext }: StepProps) {
  const isValid = data.region && data.role;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SurveyThumbnail selectedRegion={data.region} />

      <div className="mb-8">
        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-2">About You</h2>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Where are you based?</h3>
        <p className="text-gray-500 mb-6">This helps us compare perspectives across regions.</p>
        
        <select 
          className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none cursor-pointer"
          value={data.region || ""}
          onChange={(e) => updateData({ region: e.target.value })}
        >
          <option value="" disabled>Select your region</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">What best describes your role?</h3>
        <p className="text-gray-500 mb-6">Pick the closest match.</p>
        
        <div className="space-y-3">
          {ROLES.map(role => (
            <RadioItem 
              key={role}
              selected={data.role === role}
              onClick={() => updateData({ role })}
            >
              {role}
            </RadioItem>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Question 1 of 4</span>
          <button 
            onClick={onNext}
            disabled={!isValid}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Start survey <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
