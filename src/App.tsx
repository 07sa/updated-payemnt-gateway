import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { HeroBanner } from './components/HeroBanner';
import { PlanSelector } from './components/PlanSelector';
import { CouponSection } from './components/CouponSection';
import { StudentInfoForm } from './components/StudentInfoForm';
import { PaymentSection } from './components/PaymentSection';
import { OrderSummary } from './components/OrderSummary';
import { PaymentModal } from './components/PaymentModal';
import { SuccessView } from './components/SuccessView';
import { CurriculumModal } from './components/CurriculumModal';
import { PLANS, AVAILABLE_COUPONS } from './data/mockData';
import { Coupon, StudentInfo, PricingBreakdown } from './types';

export default function App() {
  // App State
  const [selectedPlanId, setSelectedPlanId] = useState<'1month' | '3months' | '6months'>('6months');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS['FIRST100']);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    fullName: 'Aarav Sharma',
    grade: 'Class 5',
    phoneNumber: '9876543210',
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);

  // Pricing Calculation
  const pricing: PricingBreakdown = useMemo(() => {
    const plan = PLANS[selectedPlanId];
    const regular = plan.regularPrice;
    let discount = 0;

    if (appliedCoupon) {
      if (appliedCoupon.type === 'fixed' && appliedCoupon.discounts) {
        discount = appliedCoupon.discounts[plan.id] || 0;
      } else if (appliedCoupon.type === 'percent' && appliedCoupon.percent) {
        discount = Math.round(regular * appliedCoupon.percent);
      }
    }

    const finalPrice = Math.max(0, regular - discount);
    const monthlyEquiv = `₹${(finalPrice / plan.months).toFixed(2)} / month`;
    const dailyEquiv = `₹${(finalPrice / plan.days).toFixed(2)} / day`;

    return {
      regular,
      discount,
      finalPrice,
      monthlyEquiv,
      dailyEquiv,
    };
  }, [selectedPlanId, appliedCoupon]);

  // Coupon Handlers
  const handleApplyCoupon = (code: string): boolean => {
    const found = AVAILABLE_COUPONS[code.toUpperCase()];
    if (found) {
      setAppliedCoupon(found);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleApplyDefaultCoupon = () => {
    setAppliedCoupon(AVAILABLE_COUPONS['FIRST100']);
  };

  const handleFocusCouponInput = () => {
    const inputEl = document.querySelector('input[placeholder*="FIRST100"]') as HTMLInputElement;
    if (inputEl) {
      inputEl.focus();
      inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Stepper state
  const isStudentInfoFilled = Boolean(
    studentInfo.fullName.trim() && studentInfo.phoneNumber.trim().length === 10
  );

  const currentStep = isSubmittedSuccess
    ? 4
    : isPaymentModalOpen
    ? 3
    : isStudentInfoFilled
    ? 3
    : 2;

  if (isSubmittedSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800">
        <Header onOpenCurriculum={() => setIsCurriculumModalOpen(true)} />
        <Stepper currentStep={4} studentInfoComplete={true} />
        <SuccessView
          studentInfo={studentInfo}
          plan={PLANS[selectedPlanId]}
          appliedCoupon={appliedCoupon}
          pricing={pricing}
          onReset={() => {
            setIsSubmittedSuccess(false);
            setIsPaymentModalOpen(false);
          }}
          onOpenCurriculum={() => setIsCurriculumModalOpen(true)}
        />
        <CurriculumModal
          isOpen={isCurriculumModalOpen}
          onClose={() => setIsCurriculumModalOpen(false)}
          selectedGrade={studentInfo.grade}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-cyan-500 selection:text-white">
      {/* 1. Header */}
      <Header onOpenCurriculum={() => setIsCurriculumModalOpen(true)} />

      {/* 2. Stepper */}
      <Stepper
        currentStep={currentStep}
        studentInfoComplete={isStudentInfoFilled}
      />

      {/* 3. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Dynamic Hero Banner */}
        <HeroBanner
          appliedCoupon={appliedCoupon}
          discountAmount={pricing.discount}
          onApplyDefault={handleApplyDefaultCoupon}
        />

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Flow Steps (Steps 1, Coupon, 2, 3) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Step 1: Select Plan */}
            <PlanSelector
              selectedPlanId={selectedPlanId}
              appliedCoupon={appliedCoupon}
              onSelectPlan={setSelectedPlanId}
            />

            {/* Coupon Code Section */}
            <CouponSection
              appliedCoupon={appliedCoupon}
              discountAmount={pricing.discount}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />

            {/* Step 2: Student Information */}
            <StudentInfoForm
              studentInfo={studentInfo}
              onChange={setStudentInfo}
            />

            {/* Step 3: UPI QR Payment */}
            <PaymentSection
              pricing={pricing}
              onConfirmPayment={() => setIsPaymentModalOpen(true)}
            />
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <OrderSummary
              plan={PLANS[selectedPlanId]}
              appliedCoupon={appliedCoupon}
              pricing={pricing}
              onRemoveCoupon={handleRemoveCoupon}
              onFocusCouponInput={handleFocusCouponInput}
            />
          </div>
        </div>
      </main>

      {/* Payment Confirmation Modal (Step 3.5) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        studentInfo={studentInfo}
        plan={PLANS[selectedPlanId]}
        appliedCoupon={appliedCoupon}
        pricing={pricing}
        onSubmitSuccess={() => {
          setIsPaymentModalOpen(false);
          setIsSubmittedSuccess(true);
        }}
      />

      {/* Curriculum & Syllabus Modal */}
      <CurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        selectedGrade={studentInfo.grade}
      />
    </div>
  );
}
