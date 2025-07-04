import type {
  ChallengeItemIntervalType,
  ChallengeItemRepeatType,
  ChallengeItemWeeklyPattern,
  FlowMonthlyPattern,
  FlowYearlyPattern,
} from '~/shared/types';

export const INTERVAL_TYPES: ChallengeItemIntervalType[] = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
];

export const REPEAT_TYPES: ChallengeItemRepeatType[] = ['EVERY', 'N', 'NM'];

export const WEEKLY_PATTERNS: ChallengeItemWeeklyPattern[] = [
  'Every Day',
  'Select Day',
];

export const MONTHLY_PATTERNS: FlowMonthlyPattern[] = [
  'Every Week',
  'Select Date',
  'Select Week',
];

export const YEARLY_PATTERNS: FlowYearlyPattern[] = [
  'Every Month',
  'Select Month',
];
