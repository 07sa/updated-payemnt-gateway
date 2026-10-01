import React from 'react';
import { ShieldCheck, MessageCircle, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenCurriculum: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCurriculum }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Grade Target */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0b1329] via-[#142247] to-[#1e3366] flex items-center justify-center shadow-md shadow-[#0b1329]/20 text-white font-bold text-xl tracking-wider">
            <svg
              className="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                Abhyas<span className="text-cyan-600">Arena</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Classes 4–7
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Daily Math, Science & Reasoning Mastery</p>
          </div>
        </div>

        {/* Trust Badges & Safety Reassurance */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onOpenCurriculum}
            className="hidden md:flex items-center space-x-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 px-2.5 py-1.5 rounded-full border border-cyan-200 transition-colors"
            title="Preview practice questions and chapter quests"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            <span>Course Syllabus</span>
          </button>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/70">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Direct UPI Checkout</span>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20Abhyas%20Arena%2C%20I%20have%20a%20question%20regarding%20subscription"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-emerald-700 font-medium bg-slate-50 hover:bg-emerald-50 px-2.5 py-1 rounded-full border border-slate-200/60 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 md:hidden" />
            <span className="hidden md:inline">Instant parent support on WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
