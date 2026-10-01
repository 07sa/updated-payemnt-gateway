import React, { useState } from 'react';
import { X, CheckCircle, Upload, MessageSquare } from 'lucide-react';
import { Plan, Coupon, StudentInfo, PricingBreakdown } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  plan: Plan;
  appliedCoupon: Coupon | null;
  pricing: PricingBreakdown;
  onSubmitSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  plan,
  appliedCoupon,
  pricing,
  onSubmitSuccess,
}) => {
  const [utrNumber, setUtrNumber] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
    }
  };

  const handleSendWhatsApp = () => {
    const studentName = studentInfo.fullName || 'Aarav Sharma';
    const phone = studentInfo.phoneNumber || '9876543210';
    const grade = studentInfo.grade || 'Class 5';
    const couponText = appliedCoupon ? `Coupon Applied: ${appliedCoupon.code}` : 'Coupon: None';
    const utrText = utrNumber ? `UPI Ref / UTR: ${utrNumber}` : 'UPI Ref: Scanned & Paid via UPI QR';

    const message = 
`*Abhyas Arena - Subscription Payment Confirmation* 🚀
----------------------------------------
👤 *Student:* ${studentName} (${grade})
📱 *Parent WhatsApp:* +91 ${phone}
📦 *Pass Plan:* ${plan.title}
💰 *Amount Paid:* ₹${pricing.finalPrice}
🎟️ *${couponText}*
🔍 *${utrText}*
----------------------------------------
_Kindly verify the payment and activate the Practice Pass. Thank you!_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
    onSubmitSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs px-4 py-6">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-discount-pop">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
            <CheckCircle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block">
            Final Confirmation Step
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
            Payment details ready to submit
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Please confirm your subscription details before sending on WhatsApp.
          </p>
        </div>

        {/* Breakdown Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs text-slate-700">
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Student:</span>
            <span className="font-bold text-slate-900 text-sm">
              {studentInfo.fullName || 'Aarav Sharma'} ({studentInfo.grade || 'Class 5'})
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">WhatsApp:</span>
            <span className="font-mono-numbers font-bold text-slate-900">
              +91 {studentInfo.phoneNumber || '9876543210'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Selected Plan:</span>
            <span className="font-bold text-slate-900">{plan.title}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Coupon:</span>
            <span className="font-mono-numbers font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {appliedCoupon ? appliedCoupon.code : 'None'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-700 font-bold">Amount Paid:</span>
            <span className="font-mono-numbers font-extrabold text-slate-900 text-base">
              ₹{pricing.finalPrice}
            </span>
          </div>
        </div>

        {/* UPI Reference / UTR input */}
        <div className="mt-3.5">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            UPI Reference / UTR Number (Optional):
          </label>
          <input
            type="text"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
            placeholder="e.g. 439281749210 (12 digits)"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono-numbers text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Optional Screenshot Attachment Box */}
        <div className="mt-3 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between text-xs">
          <label className="flex items-center space-x-2.5 text-slate-600 cursor-pointer flex-1">
            <Upload className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block text-xs">
                {attachedFileName ? `Attached: ${attachedFileName}` : 'Attach Payment Screenshot (Optional)'}
              </span>
              <span className="text-[10px] text-slate-400">JPG, PNG or PDF under 5MB</span>
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <span className="text-xs font-bold text-cyan-700 ml-2">Browse</span>
        </div>

        {/* WhatsApp CTA Button */}
        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="w-full py-4 px-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Send Details on WhatsApp →</span>
          </button>
          <p className="text-[11px] text-center text-slate-400">
            Opens WhatsApp app with your message pre-composed
          </p>
        </div>
      </div>
    </div>
  );
};
