import React, { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { PricingBreakdown } from '../types';

interface PaymentSectionProps {
  pricing: PricingBreakdown;
  onConfirmPayment: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  pricing,
  onConfirmPayment,
}) => {
  const [copied, setCopied] = useState(false);
  const upiId = 'abhyasarena@icici';

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // UPI Intent URL for mobile users
  const upiPayUrl = `upi://pay?pa=${upiId}&pn=Abhyas%20Arena&am=${pricing.finalPrice}&cu=INR&tn=AbhyasArena%20Subscription`;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 relative overflow-hidden">
      <div className="mb-4">
        <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block">
          Step 3 of 4
        </span>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Complete Your Payment</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Instant UPI payment. Scan with GPay, PhonePe, Paytm, or BHIM.
        </p>
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200 p-5 sm:p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* QR Code Container */}
          <div className="flex flex-col items-center shrink-0 w-full sm:w-auto">
            <div className="relative bg-white p-4 rounded-2xl border-2 border-cyan-500 shadow-lg shadow-cyan-500/10">
              {/* Live Amount Pill on QR Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0b1329] text-cyan-300 text-[11px] font-mono-numbers font-bold px-3.5 py-0.5 rounded-full border border-cyan-400/40 shadow-sm whitespace-nowrap">
                Scan & Pay ₹{pricing.finalPrice}
              </div>

              {/* High Precision Visual UPI QR SVG */}
              <div className="w-48 h-48 sm:w-52 sm:h-52 bg-white flex items-center justify-center rounded-lg relative overflow-hidden">
                <svg
                  className="w-full h-full text-slate-900"
                  viewBox="0 0 200 200"
                  fill="currentColor"
                >
                  {/* Position markers (Top-Left) */}
                  <rect x="10" y="10" width="55" height="55" rx="10" fill="#0b1329" />
                  <rect x="18" y="18" width="39" height="39" rx="6" fill="#ffffff" />
                  <rect x="26" y="26" width="23" height="23" rx="4" fill="#0284c7" />

                  {/* Position markers (Top-Right) */}
                  <rect x="135" y="10" width="55" height="55" rx="10" fill="#0b1329" />
                  <rect x="143" y="18" width="39" height="39" rx="6" fill="#ffffff" />
                  <rect x="151" y="26" width="23" height="23" rx="4" fill="#0284c7" />

                  {/* Position markers (Bottom-Left) */}
                  <rect x="10" y="135" width="55" height="55" rx="10" fill="#0b1329" />
                  <rect x="18" y="143" width="39" height="39" rx="6" fill="#ffffff" />
                  <rect x="26" y="151" width="23" height="23" rx="4" fill="#0284c7" />

                  {/* Stylized QR Data Matrix */}
                  <rect x="75" y="15" width="10" height="10" rx="2" fill="#0b1329" />
                  <rect x="95" y="15" width="15" height="10" rx="2" fill="#0b1329" />
                  <rect x="115" y="15" width="10" height="10" rx="2" fill="#0b1329" />
                  <rect x="75" y="35" width="20" height="10" rx="2" fill="#0284c7" />
                  <rect x="105" y="35" width="10" height="10" rx="2" fill="#0b1329" />
                  <rect x="120" y="35" width="10" height="15" rx="2" fill="#0b1329" />
                  <rect x="75" y="55" width="12" height="12" rx="2" fill="#0b1329" />
                  <rect x="95" y="55" width="12" height="12" rx="2" fill="#0284c7" />
                  <rect x="115" y="55" width="12" height="12" rx="2" fill="#0b1329" />

                  {/* Center Column Pattern */}
                  <rect x="15" y="75" width="12" height="12" rx="2" fill="#0b1329" />
                  <rect x="35" y="75" width="12" height="12" rx="2" fill="#0b1329" />
                  <rect x="55" y="75" width="12" height="12" rx="2" fill="#0284c7" />
                  <rect x="75" y="75" width="15" height="15" rx="3" fill="#0b1329" />
                  <rect x="100" y="75" width="15" height="15" rx="3" fill="#0284c7" />
                  <rect x="125" y="75" width="15" height="15" rx="3" fill="#0b1329" />
                  <rect x="150" y="75" width="12" height="12" rx="2" fill="#0b1329" />
                  <rect x="170" y="75" width="15" height="15" rx="3" fill="#0284c7" />

                  <rect x="15" y="95" width="15" height="10" rx="2" fill="#0284c7" />
                  <rect x="40" y="95" width="10" height="15" rx="2" fill="#0b1329" />
                  <rect x="60" y="95" width="20" height="10" rx="2" fill="#0b1329" />
                  <rect x="90" y="95" width="20" height="20" rx="4" fill="#0b1329" />
                  <rect x="120" y="95" width="10" height="15" rx="2" fill="#0284c7" />
                  <rect x="140" y="95" width="25" height="10" rx="2" fill="#0b1329" />
                  <rect x="175" y="95" width="15" height="10" rx="2" fill="#0b1329" />

                  <rect x="15" y="115" width="10" height="10" rx="2" fill="#0b1329" />
                  <rect x="35" y="115" width="15" height="10" rx="2" fill="#0284c7" />
                  <rect x="60" y="115" width="10" height="10" rx="2" fill="#0b1329" />
                  <rect x="80" y="120" width="15" height="10" rx="2" fill="#0b1329" />
                  <rect x="105" y="120" width="15" height="15" rx="3" fill="#0284c7" />
                  <rect x="130" y="115" width="10" height="10" rx="2" fill="#0b1329" />
                  <rect x="150" y="115" width="20" height="10" rx="2" fill="#0b1329" />

                  {/* Bottom Right Details */}
                  <rect x="75" y="140" width="12" height="12" rx="2" fill="#0284c7" />
                  <rect x="95" y="140" width="20" height="12" rx="2" fill="#0b1329" />
                  <rect x="125" y="140" width="15" height="15" rx="3" fill="#0284c7" />
                  <rect x="150" y="140" width="15" height="15" rx="3" fill="#0b1329" />
                  <rect x="175" y="140" width="15" height="15" rx="3" fill="#0284c7" />
                  <rect x="75" y="165" width="20" height="15" rx="3" fill="#0b1329" />
                  <rect x="105" y="165" width="12" height="12" rx="2" fill="#0284c7" />
                  <rect x="125" y="165" width="25" height="12" rx="2" fill="#0b1329" />
                  <rect x="160" y="165" width="25" height="20" rx="4" fill="#0b1329" />

                  {/* Center Brand Crest Icon */}
                  <circle cx="100" cy="100" r="19" fill="#0b1329" stroke="#ffffff" strokeWidth="3" />
                  <path
                    d="M93 100l4 4 10-10"
                    fill="none"
                    stroke="#00d2ff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Accepted App Icons Bar */}
              <div className="mt-2 flex items-center justify-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>USE ANY UPI APP</span>
              </div>
            </div>

            {/* UPI ID Copy Bar */}
            <div
              onClick={handleCopy}
              className="mt-3 w-full bg-slate-100 hover:bg-slate-200/80 rounded-xl p-2 px-3 flex items-center justify-between border border-slate-300/80 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">UPI ID:</span>
                <span className="font-mono-numbers text-xs font-bold text-slate-800">{upiId}</span>
              </div>
              <button
                type="button"
                className="text-[11px] font-bold text-cyan-700 bg-white shadow-xs px-2.5 py-1 rounded-md border border-slate-200 hover:text-cyan-800 flex items-center space-x-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile UPI Direct App Launcher */}
            <div className="mt-2.5 w-full flex items-center justify-between gap-1 text-[10px] text-slate-500">
              <span className="font-medium">Direct Pay:</span>
              <a
                href={upiPayUrl}
                className="font-bold text-cyan-700 hover:underline flex items-center space-x-0.5"
              >
                <span>Launch UPI App</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Instructions & Confirm Button */}
          <div className="flex-1 space-y-3.5 w-full">
            <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider block">
                  Pay Exact Payable Amount
                </span>
                <span className="text-xl font-extrabold text-cyan-950 font-mono-numbers">
                  ₹{pricing.finalPrice}
                </span>
              </div>
              <span className="text-xs font-semibold text-cyan-700 bg-white px-2.5 py-1 rounded-lg border border-cyan-200">
                Zero extra fees
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Open <strong>Google Pay, PhonePe, Paytm</strong> or any UPI App on your phone.
                </span>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Scan the QR code shown here or pay to the UPI ID.</span>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Pay the exact amount:{' '}
                  <strong className="text-slate-900 font-mono-numbers">₹{pricing.finalPrice}</strong>.
                </span>
              </div>

              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  Return here and click <strong>"I've Completed the Payment"</strong> below.
                </span>
              </div>
            </div>

            {/* Primary Action CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onConfirmPayment}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-600/25 transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>✓ I’ve Completed the Payment</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-1.5">
                You will share payment confirmation via WhatsApp in the next step
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
