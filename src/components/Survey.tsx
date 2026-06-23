import React, { useState } from 'react';
import { SurveyHeader, ProgressBar } from './SurveyLayout';
import { Step0 } from './steps/Step0';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4, SuccessStep } from './steps/Step4';
import { SurveyData } from '../types';
import { db } from '../db';

export function Survey() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<SurveyData>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateData = (updates: Partial<SurveyData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (step === 4) {
      db.saveResponse(data as any);
      setSubmitted(true);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(s => s - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-2xl bg-white p-10 md:p-14 rounded-3xl border border-gray-100 shadow-sm">
           <SuccessStep />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center py-12 px-6 font-sans">
      <div className="w-full max-w-3xl">
        <SurveyHeader />
        
        <div className="bg-[#FCFCFC] p-8 md:p-12 rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {step > 0 && <ProgressBar current={step} total={4} />}
          
          <div className="mt-4">
            {step === 0 && <Step0 data={data} updateData={updateData} onNext={handleNext} />}
            {step === 1 && <Step1 data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
            {step === 2 && <Step2 data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <Step3 data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
            {step === 4 && <Step4 data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
          </div>
        </div>

        <div className="mt-12 text-center">
           <a href="/?admin=true" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Admin Access
           </a>
        </div>
      </div>
    </div>
  );
}
