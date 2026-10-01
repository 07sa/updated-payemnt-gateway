import React, { useState } from 'react';
import { Check, Info, MessageSquare, ArrowLeft, Printer, Sparkles } from 'lucide-react';
import { Plan, Coupon, StudentInfo, PricingBreakdown } from '../types';

interface SuccessViewProps {
  studentInfo: StudentInfo;
  plan: Plan;
  appliedCoupon: Coupon | null;
  pricing: PricingBreakdown;
  onReset: () => void;
  onOpenCurriculum: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  studentInfo,
  plan,
  appliedCoupon,
  pricing,
  onReset,
  onOpenCurriculum,
}) => {
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  const studentName = studentInfo.fullName || 'Aarav Sharma';
  const phone = studentInfo.phoneNumber || '9876543210';
  const grade = studentInfo.grade || 'Class 5';
  const passId = `ABH-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleCopyPassId = () => {
    navigator.clipboard.writeText(passId).then(() => {
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-9 shadow-xl border border-slate-200 text-center animate-discount-pop">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
          Details Submitted
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Almost Done! 🎉
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
          Your payment details have been sent for confirmation.
        </p>

        {/* Digital Practice Pass Card */}
        <div className="mt-6 bg-gradient-to-br from-slate-900 via-[#101b38] to-[#162752] text-white rounded-2xl p-4 text-left shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">
              Student Arena Pass
            </span>
            <button
              onClick={handleCopyPassId}
              className="text-[10px] font-mono-numbers bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-slate-300 cursor-pointer"
            >
              {copiedReceipt ? 'Copied' : `Ref: ${passId}`}
            </button>
          </div>

          <div className="mt-2.5 flex justify-between items-end">
            <div>
              <p className="text-lg font-bold text-white tracking-wide">{studentName}</p>
              <p className="text-xs text-slate-300 font-medium">{grade} • Daily Quests Access</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-400 font-bold block">Status</span>
              <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
                Verification Pending
              </span>
            </div>
          </div>
        </div>

        {/* Summary Details */}
        <div className="mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Student Name:</span>
            <span className="font-bold text-slate-900">{studentName}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Selected Plan:</span>
            <span className="font-bold text-slate-900">{plan.title}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Coupon Used:</span>
            <span className="font-mono-numbers font-bold text-emerald-600">
              {appliedCoupon ? appliedCoupon.code : 'None'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Amount:</span>
            <span className="font-mono-numbers font-bold text-slate-950">₹{pricing.finalPrice}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 font-medium">WhatsApp Number:</span>
            <span className="font-mono-numbers font-bold text-slate-900">+91 {phone}</span>
          </div>
        </div>

        {/* Verification explanation */}
        <div className="mt-4 p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/80 text-xs text-cyan-900 leading-relaxed text-left flex items-start space-x-3">
          <Info className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
          <p>
            We’ll confirm your payment and activate your Practice Pass within 15–30 minutes. You will
            receive an instant login PIN directly on WhatsApp.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Open WhatsApp Chat Again</span>
          </a>

          <button
            type="button"
            onClick={onOpenCurriculum}
            className="w-full py-2.5 px-4 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 font-bold text-xs rounded-xl border border-cyan-200 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Preview Syllabus & Chapter Quests</span>
          </button>

          <div className="flex items-center space-x-2 pt-1">
            <button
              type="button"
              onClick={handlePrintReceipt}
              className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Receipt</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Plan</span>
            </button>
          </div>
        </div>

        {/* Need Help Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center space-x-1.5">
          <span>Need help?</span>
          <a
            href="https://wa.me/919876543210?text=Help%20with%20payment%20activation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cyan-700 underline"
          >
            Chat with Abhyas Support on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
