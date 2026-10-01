import React from 'react';
import { User, Lock, GraduationCap } from 'lucide-react';
import { StudentInfo } from '../types';

interface StudentInfoFormProps {
  studentInfo: StudentInfo;
  onChange: (info: StudentInfo) => void;
}

export const StudentInfoForm: React.FC<StudentInfoFormProps> = ({ studentInfo, onChange }) => {
  const grades = ['Class 4', 'Class 5', 'Class 6', 'Class 7'];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...studentInfo, fullName: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange({ ...studentInfo, phoneNumber: raw });
  };

  const handleGradeSelect = (grade: string) => {
    onChange({ ...studentInfo, grade });
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      <div className="mb-4">
        <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block">
          Step 2 of 4
        </span>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Information</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Enter details to associate the subscription and receive WhatsApp activation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="studentFullName"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Student Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="studentFullName"
                type="text"
                value={studentInfo.fullName}
                onChange={handleNameChange}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-400"
              />
              <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* WhatsApp Mobile Number */}
          <div>
            <label
              htmlFor="whatsappPhone"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              WhatsApp Mobile Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold font-mono-numbers">
                +91
              </span>
              <input
                id="whatsappPhone"
                type="tel"
                maxLength={10}
                value={studentInfo.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="10-digit mobile number"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-sm font-mono-numbers font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Grade Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Select Class / Standard
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {grades.map((g) => {
              const active = studentInfo.grade === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGradeSelect(g)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                    active
                      ? 'border-cyan-600 bg-cyan-50 text-cyan-900 shadow-xs ring-1 ring-cyan-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className={`w-3.5 h-3.5 ${active ? 'text-cyan-600' : 'text-slate-400'}`} />
                  <span>{g}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Privacy Reassurance Callout */}
      <div className="mt-4 flex items-start space-x-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
        <Lock className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
        <p>
          <strong className="font-semibold text-slate-800">Privacy Reassurance:</strong> This number
          will be used only for payment confirmation and sending your subscription details on
          WhatsApp. No spam or promotional calls.
        </p>
      </div>
    </section>
  );
};
