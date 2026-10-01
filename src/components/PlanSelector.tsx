import React from 'react';
import { Plan, Coupon } from '../types';
import { PLANS } from '../data/mockData';
import { Check } from 'lucide-react';

interface PlanSelectorProps {
  selectedPlanId: string;
  appliedCoupon: Coupon | null;
  onSelectPlan: (planId: '1month' | '3months' | '6months') => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  selectedPlanId,
  appliedCoupon,
  onSelectPlan,
}) => {
  const getCalculatedPrice = (plan: Plan) => {
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'fixed' && appliedCoupon.discounts) {
        discount = appliedCoupon.discounts[plan.id] || 0;
      } else if (appliedCoupon.type === 'percent' && appliedCoupon.percent) {
        discount = Math.round(plan.regularPrice * appliedCoupon.percent);
      }
    }
    const finalPrice = Math.max(0, plan.regularPrice - discount);
    const monthly = (finalPrice / plan.months).toFixed(2);
    const daily = (finalPrice / plan.days).toFixed(2);

    return {
      regular: plan.regularPrice,
      discount,
      finalPrice,
      monthly,
      daily,
    };
  };

  const planKeys: Array<'1month' | '3months' | '6months'> = ['1month', '3months', '6months'];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block">
            Step 1 of 4
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Select Subscription Plan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Includes unlimited chapter quests, leaderboards & daily streak rewards.
          </p>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          Cancel anytime
        </span>
      </div>

      {/* 3 Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
        {planKeys.map((key) => {
          const plan = PLANS[key];
          const info = getCalculatedPrice(plan);
          const isSelected = selectedPlanId === key;
          const isBestValue = plan.id === '6months';

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(key)}
              className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 bg-white group select-none ${
                isSelected
                  ? 'border-cyan-600 bg-gradient-to-b from-cyan-50/40 to-white shadow-md shadow-cyan-600/10 ring-2 ring-cyan-500/10'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Best value ribbon */}
              {isBestValue && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-[#142247] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md shadow-cyan-600/20 z-10 whitespace-nowrap">
                  ⭐ BEST VALUE
                </div>
              )}

              {/* Header inside card */}
              <div className="flex justify-between items-start mt-0.5">
                <span
                  className={`text-xs uppercase tracking-wide ${
                    isSelected ? 'font-extrabold text-cyan-950' : 'font-bold text-slate-700'
                  }`}
                >
                  {plan.id === '1month' ? '1 MONTH' : plan.id === '3months' ? '3 MONTHS' : '6 MONTHS'}
                </span>

                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-cyan-600'
                      : 'border-slate-300 group-hover:border-cyan-500'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-600" />}
                </span>
              </div>

              {/* Pricing row */}
              <div className="mt-2.5">
                <div className="flex items-baseline space-x-2">
                  <span
                    className={`text-2xl font-extrabold font-mono-numbers ${
                      isSelected ? 'text-slate-950' : 'text-slate-800'
                    }`}
                  >
                    ₹{info.finalPrice}
                  </span>
                  {info.discount > 0 ? (
                    <span className="text-sm text-slate-400 font-semibold line-through font-mono-numbers">
                      ₹{info.regular}
                    </span>
                  ) : null}
                </div>

                <div className="mt-1 space-y-0.5 text-[11px]">
                  <p
                    className={`font-medium ${
                      isSelected ? 'text-cyan-800 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    ₹{info.monthly} / month
                  </p>
                  <p
                    className={`${
                      isSelected ? 'text-emerald-600 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    ₹{info.daily} / day
                  </p>
                </div>
              </div>

              {/* Bottom footer in card */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                {info.discount > 0 ? (
                  <span
                    className={`font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'text-emerald-700 bg-emerald-100/90'
                        : 'text-emerald-600 bg-emerald-50'
                    }`}
                  >
                    Save ₹{info.discount}
                  </span>
                ) : (
                  <span className="font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                    Regular
                  </span>
                )}
                <span
                  className={`font-medium ${
                    isSelected ? 'text-cyan-700 font-bold' : 'text-slate-400'
                  }`}
                >
                  {plan.id === '6months'
                    ? 'Recommended'
                    : plan.id === '3months'
                    ? 'Term Pass'
                    : 'Starter'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature perks for Abhyas Arena students */}
      <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
            ✓
          </span>
          <span className="font-medium">Class 4–7 Olympiad & CBSE</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
            ✓
          </span>
          <span className="font-medium">Unlimited Gamified Quizzes</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
            ✓
          </span>
          <span className="font-medium">Parent WhatsApp Weekly Report</span>
        </div>
      </div>
    </section>
  );
};
