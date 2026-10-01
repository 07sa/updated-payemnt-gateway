import React, { useState } from 'react';
import { X, Award, CheckCircle2, Zap, MessageCircle, BarChart3 } from 'lucide-react';
import { SAMPLE_QUESTS } from '../data/mockData';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGrade: string;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  isOpen,
  onClose,
  selectedGrade,
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'report'>('curriculum');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs px-4 py-6">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
              {selectedGrade || 'Class 4–7'} Syllabus
            </span>
            <h3 className="text-lg font-bold text-slate-900">What’s Inside Abhyas Arena?</h3>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daily Quests & Syllabus
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'report'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weekly Parent WhatsApp Report
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1 text-xs">
          {activeTab === 'curriculum' ? (
            <>
              <div className="p-3 bg-cyan-50/60 rounded-xl border border-cyan-200/80 flex items-start space-x-2.5">
                <Zap className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <p className="text-cyan-950">
                  Daily 15-minute bite-sized practice sessions designed by Olympiad rank-holders to develop mathematical intuition and logical reasoning without screen fatigue.
                </p>
              </div>

              <div className="space-y-2.5 mt-2">
                {SAMPLE_QUESTS.map((quest) => (
                  <div
                    key={quest.subject}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-900 text-sm">{quest.subject}</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {quest.badge}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs">{quest.topic}</p>
                    <div className="mt-2 flex items-center text-[11px] text-cyan-700 font-semibold space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{quest.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Sample Sunday Parent Progress Dispatch:</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 font-mono-numbers text-[11px] text-slate-700 leading-relaxed shadow-xs">
                <p className="font-bold text-slate-900">📊 Abhyas Arena Weekly Summary</p>
                <p className="mt-1">Student: Aarav Sharma ({selectedGrade || 'Class 5'})</p>
                <p>🔥 7-Day Active Streak: 7/7 Days Complete</p>
                <p>🎯 Questions Solved: 84 (Accuracy: 92%)</p>
                <p>🏆 Arena Rank: Top 4% in Grade Leaderboard</p>
                <p className="mt-2 text-emerald-700 font-semibold">
                  💡 Recommendation: Aarav excelled at mental division; next week we will introduce advanced fractions!
                </p>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                <BarChart3 className="w-3.5 h-3.5 text-cyan-600" />
                <span>Sent automatically to your registered WhatsApp every Sunday at 8 PM.</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Got it, Continue Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
