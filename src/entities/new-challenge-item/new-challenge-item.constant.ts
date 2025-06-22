import type {
  ChallengeItemIntervalType,
  ChallengeItemMonthlyPattern,
  ChallengeItemRepeatType,
  ChallengeItemWeeklyPattern,
  ChallengeItemYearlyPattern,
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

export const MONTHLY_PATTERNS: ChallengeItemMonthlyPattern[] = [
  'Every Week',
  'Select Date',
  'Select Week',
];

export const YEARLY_PATTERNS: ChallengeItemYearlyPattern[] = [
  'Every Month',
  'Select Month',
];
