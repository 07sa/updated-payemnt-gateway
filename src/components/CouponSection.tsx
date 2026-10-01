import React, { useState } from 'react';
import { Tag, Check, Trash2, Ticket } from 'lucide-react';
import { Coupon } from '../types';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface CouponSectionProps {
  appliedCoupon: Coupon | null;
  discountAmount: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CouponSection: React.FC<CouponSectionProps> = ({
  appliedCoupon,
  discountAmount,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [inputValue, setInputValue] = useState(appliedCoupon ? appliedCoupon.code : 'FIRST100');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const handleApply = (codeToApply?: string) => {
    const code = (codeToApply || inputValue).trim().toUpperCase();
    if (!code) {
      triggerError('Please enter a coupon code.');
      return;
    }

    const success = onApplyCoupon(code);
    if (success) {
      setInputValue(code);
      setMessage({
        text: `Success! Coupon "${code}" applied successfully.`,
        type: 'success',
      });
      setTimeout(() => setMessage(null), 4000);
    } else {
      triggerError(`Coupon code "${code}" is invalid or expired. Try "FIRST100".`);
    }
  };

  const triggerError = (msg: string) => {
    setMessage({ text: msg, type: 'error' });
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleRemove = () => {
    const code = appliedCoupon?.code;
    onRemoveCoupon();
    setMessage({
      text: code ? `Coupon "${code}" removed. Full pricing restored.` : 'Coupon removed.',
      type: 'info',
    });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-100/80 text-cyan-700 flex items-center justify-center">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Have a Coupon or Promo Code?</h3>
            <p className="text-xs text-slate-500">Apply discounts to your subscription pass instantly.</p>
          </div>
        </div>

        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors ${
            appliedCoupon
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
              : 'text-slate-500 bg-slate-100 border-slate-200'
          }`}
        >
          {appliedCoupon ? '1 Active Offer' : 'No Coupon Active'}
        </span>
      </div>

      <div className="space-y-3">
        {/* Active Coupon Card (Shown when coupon applied) */}
        {appliedCoupon && (
          <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-white border border-emerald-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono-numbers font-extrabold text-slate-900 text-sm tracking-wider uppercase">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Applied
                  </span>
                </div>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                  You're saving extra <span className="font-bold font-mono-numbers">₹{discountAmount}</span> on this subscription!
                </p>
              </div>
            </div>

            {/* Remove Coupon Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="self-end sm:self-auto px-3.5 py-1.5 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-semibold text-xs rounded-lg border border-slate-200 hover:border-rose-300 transition-all flex items-center space-x-1 shadow-xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Remove Coupon</span>
            </button>
          </div>
        )}

        {/* Input Form Box */}
        <div className="relative">
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-transform ${
              isShaking ? 'shake-animation' : ''
            }`}
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Ticket className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApply();
                }}
                placeholder="Enter coupon code (e.g. FIRST100)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono-numbers uppercase tracking-wider font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-400 placeholder:normal-case placeholder:font-sans"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleApply()}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0b1329] hover:bg-[#142247] active:bg-[#080d1c] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Apply</span>
              </button>

              {appliedCoupon && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Validation Feedback */}
          {message && (
            <p
              className={`text-xs mt-1.5 font-medium transition-all ${
                message.type === 'success'
                  ? 'text-emerald-600'
                  : message.type === 'error'
                  ? 'text-rose-600'
                  : 'text-slate-600'
              }`}
            >
              {message.text}
            </p>
          )}
        </div>

        {/* Quick Offers Chips */}
        <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Apply:</span>
          <button
            type="button"
            onClick={() => {
              setInputValue('FIRST100');
              handleApply('FIRST100');
            }}
            className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border font-mono-numbers text-[11px] transition-all cursor-pointer ${
              appliedCoupon?.code === 'FIRST100'
                ? 'border-cyan-400 bg-cyan-100 text-cyan-900 font-bold'
                : 'border-cyan-200 bg-cyan-50 text-cyan-800 font-semibold hover:bg-cyan-100'
            }`}
          >
            <span>FIRST100</span>
            <span className="text-[10px] text-cyan-600 font-sans font-normal">(Save up to ₹80)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setInputValue('OLYMPIAD20');
              handleApply('OLYMPIAD20');
            }}
            className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border font-mono-numbers text-[11px] transition-all cursor-pointer ${
              appliedCoupon?.code === 'OLYMPIAD20'
                ? 'border-slate-400 bg-slate-200 text-slate-900 font-bold'
                : 'border-slate-200 bg-slate-50 text-slate-700 font-semibold hover:bg-slate-100'
            }`}
          >
            <span>OLYMPIAD20</span>
            <span className="text-[10px] text-slate-500 font-sans font-normal">(Save 20%)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
