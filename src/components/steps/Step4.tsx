import React from 'react';
import { StepProps } from '../../types';
import { CheckCircle2 } from 'lucide-react';

export function Step4({ data, updateData, onNext, onBack }: StepProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-2">Question 4 of 4</h2>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
          Where should we send the final report?
        </h3>
        <p className="text-gray-500 mb-8">This is completely optional. We'll send you the aggregated insights once the survey closes.</p>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-[15px] font-medium text-gray-900 mb-2">Name (Optional)</label>
            <input 
              type="text"
              placeholder="Jane Doe"
              className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={data.name || ""}
              onChange={(e) => updateData({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[15px] font-medium text-gray-900 mb-2">Work Email (Optional)</label>
            <input 
              type="email"
              placeholder="jane@company.com"
              className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={data.email || ""}
              onChange={(e) => updateData({ email: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-900 hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md"
        >
          Submit Survey <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function SuccessStep() {
  return (
    <div className="py-20 text-center animate-in zoom-in-95 duration-500">
      <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">Response Recorded</h2>
      <p className="text-gray-500 max-w-md mx-auto text-lg mb-8">
        Thank you for contributing to the 2026 Global Design Survey. Your insights help shape the future of our industry.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="text-sm font-medium text-gray-500 hover:text-black underline underline-offset-4"
      >
        Submit another response
      </button>
    </div>
  );
}
