export interface Plan {
  id: '1month' | '3months' | '6months';
  title: string;
  regularPrice: number;
  months: number;
  days: number;
  tag: string;
  recommended?: boolean;
}

export interface Coupon {
  code: string;
  name: string;
  type: 'fixed' | 'percent';
  discounts?: Record<string, number>;
  percent?: number;
}

export interface StudentInfo {
  fullName: string;
  grade: string;
  phoneNumber: string;
}

export interface PricingBreakdown {
  regular: number;
  discount: number;
  finalPrice: number;
  monthlyEquiv: string;
  dailyEquiv: string;
}
