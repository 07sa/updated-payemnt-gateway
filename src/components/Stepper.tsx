import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number; // 1, 2, 3, 4
  studentInfoComplete: boolean;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, studentInfoComplete }) => {
  const steps = [
    { num: '01', title: 'Select Plan', isDone: true, isActive: currentStep === 1 },
    { num: '02', title: 'Student Info', isDone: studentInfoComplete, isActive: currentStep === 2 },
    { num: '03', title: 'Scan UPI QR', isDone: currentStep >= 4, isActive: currentStep === 3 },
    { num: '04', title: 'WhatsApp Activation', isDone: currentStep === 4, isActive: currentStep === 4 },
  ];

  return (
    <div className="bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
          {steps.map((step, idx) => {
            const isCompleted = step.isDone && !step.isActive && (idx + 1 < currentStep || (idx === 1 && studentInfoComplete));
            const isCurrent = step.isActive || (idx === 0 && currentStep === 1);
            const isHighlighted = isCompleted || isCurrent;

            return (
              <React.Fragment key={step.num}>
                <div
                  className={`flex items-center space-x-2 transition-colors ${
                    isHighlighted ? 'text-cyan-800' : 'text-slate-400'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500/20'
                        : isCurrent
                        ? 'bg-cyan-100 text-cyan-800 ring-2 ring-cyan-500/20'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> : step.num}
                  </span>
                  <span className={`${isCurrent ? 'font-bold text-slate-900' : isCompleted ? 'font-semibold text-slate-700' : 'font-medium'}`}>
                    {step.title}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-16 h-0.5 transition-all ${
                      isHighlighted ? 'bg-cyan-200' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
