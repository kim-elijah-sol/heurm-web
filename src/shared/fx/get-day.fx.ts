import { CHALLENGE_DAY } from '../constant';
import { ChallengeDay } from '../types';

export const getDay = (dayValue: number): ChallengeDay =>
  CHALLENGE_DAY[dayValue];
