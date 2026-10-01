import { Plan, Coupon } from '../types';

export const PLANS: Record<string, Plan> = {
  '1month': {
    id: '1month',
    title: '1 Month Practice Pass',
    regularPrice: 99,
    months: 1,
    days: 30,
    tag: 'Starter',
  },
  '3months': {
    id: '3months',
    title: '3 Months Practice Pass',
    regularPrice: 249,
    months: 3,
    days: 90,
    tag: 'Term Pass',
  },
  '6months': {
    id: '6months',
    title: '6 Months Practice Pass',
    regularPrice: 399,
    months: 6,
    days: 180,
    tag: 'Best Value',
    recommended: true,
  },
};

export const AVAILABLE_COUPONS: Record<string, Coupon> = {
  'FIRST100': {
    code: 'FIRST100',
    name: 'Special pricing for the first 100 students',
    type: 'fixed',
    discounts: {
      '1month': 20,
      '3months': 50,
      '6months': 80,
    },
  },
  'OLYMPIAD20': {
    code: 'OLYMPIAD20',
    name: 'Olympiad Aspirant 20% Off',
    type: 'percent',
    percent: 0.20,
  },
  'SUPER30': {
    code: 'SUPER30',
    name: 'Flash Weekend Special 30% Off',
    type: 'percent',
    percent: 0.30,
  },
};

export const SAMPLE_QUESTS = [
  {
    subject: 'Mental Math',
    topic: 'Speed Multiplication & Number Patterns',
    level: 'Daily Streak #14',
    badge: 'Olympiad Pattern',
  },
  {
    subject: 'General Science',
    topic: 'Forces, Energy & Living Organisms',
    level: 'Chapter Quest 6',
    badge: 'CBSE & ICSE Aligned',
  },
  {
    subject: 'Logical Reasoning',
    topic: 'Venn Diagrams, Analogies & Series Completion',
    level: 'National Arena Qualifier',
    badge: 'Weekly Leaderboard',
  },
];
