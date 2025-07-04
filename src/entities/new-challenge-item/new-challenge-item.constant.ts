import type {
  FlowIntervalType,
  FlowMonthlyPattern,
  FlowRepeatType,
  FlowWeeklyPattern,
  FlowYearlyPattern,
} from '~/shared/types';

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
