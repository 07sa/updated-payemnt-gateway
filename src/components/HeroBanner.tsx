import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { Coupon } from '../types';

interface HeroBannerProps {
  appliedCoupon: Coupon | null;
  discountAmount: number;
  onApplyDefault: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  appliedCoupon,
  discountAmount,
  onApplyDefault,
}) => {
  const isApplied = Boolean(appliedCoupon);

  return (
    <div className="mb-8 bg-gradient-to-r from-[#0b1329] via-[#0f1a36] to-[#142247] rounded-2xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden transition-all duration-300 border border-slate-800">
      {/* Decorative background glow */}
      <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-cyan-500/15 to-transparent pointer-events-none" />
      <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-start sm:items-center space-x-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold shrink-0 transition-all ${
              isApplied
                ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 coupon-pulse'
                : 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-300'
            }`}
          >
            <Tag className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`font-mono-numbers text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                  isApplied
                    ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
                    : 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30'
                }`}
              >
                {isApplied ? 'Coupon Applied' : 'Special Offer Available'}
              </span>
              {isApplied && (
                <span className="text-xs font-semibold text-cyan-300 tracking-wide font-mono-numbers">
                  {appliedCoupon?.code}
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              {isApplied
                ? 'Special pricing for the first 100 students'
                : 'Unlock special pricing with code FIRST100'}
            </h2>
            <p className="text-xs text-slate-300">
              {isApplied
                ? 'Launch offer unlocked: Extra savings applied to all practice passes.'
                : 'Get maximum instant savings on 6-month & term passes today.'}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/15 self-start sm:self-auto flex items-center space-x-3">
          <div className="text-right">
            <span className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider">
              {isApplied ? 'Your Maximum Benefit' : 'Launch Discount'}
            </span>
            <span className="text-xs text-emerald-300 font-semibold">
              {isApplied ? 'Instant Savings on Practice Pass' : 'Save up to ₹80 Instantly'}
            </span>
          </div>

          {isApplied ? (
            <span className="text-lg font-extrabold text-emerald-400 font-mono-numbers">
              SAVE ₹{discountAmount > 0 ? discountAmount : 80}
            </span>
          ) : (
            <button
              onClick={onApplyDefault}
              className="text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Apply FIRST100</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
