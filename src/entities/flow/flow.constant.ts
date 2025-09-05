import type {
  FlowAccumulateType,
  FlowIntervalType,
  FlowMonthlyPattern,
  FlowRepeatType,
  FlowWeeklyPattern,
  FlowYearlyPattern,
} from '~/shared/types';

export const ACCUMULATE_TYPES: FlowAccumulateType[] = [
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
];

export const INTERVAL_TYPES: FlowIntervalType[] = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
];

export const REPEAT_TYPES: FlowRepeatType[] = ['EVERY', 'N', 'NM'];

export const WEEKLY_PATTERNS: FlowWeeklyPattern[] = ['Every Day', 'Select Day'];

export const MONTHLY_PATTERNS: FlowMonthlyPattern[] = [
  'Every Week',
  'Select Date',
  'Select Week',
];

export const YEARLY_PATTERNS: FlowYearlyPattern[] = [
  'Every Month',
  'Select Month',
];

export const NOT_ALLOW_RECORD_FUTURE = [
  'Hold on! You can only check this off future.',
  'Too early! This task is scheduled for future.',
  'Nice try! But this flow is set for future.',
  'Time traveler detected 👀 — Let’s wait until future!',
  'Patience! Future’s flow can’t be completed today.',
  'Oops! You’re a bit ahead of schedule.',
  'Great enthusiasm! But let’s stick to today’s goals first.',
  'We love your energy, but this task starts future.',
  'Consistency matters — mark it when the time is right.',
] as const;
