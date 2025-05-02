import { CHALLENGE_DAY } from './challenge-day.constant';

type ChallengeItemBase = {
  name: string;
  day: (typeof CHALLENGE_DAY)[number][];
};

type CountableType = {
  targetCount: number;
  count: number | null;
};

type CompletableType = {
  type: 'complete';
  isCompleted: boolean | null;
};

export type CompleteChallengeItemType = ChallengeItemBase & CompletableType;

export type OverChallengeItemType = ChallengeItemBase &
  CountableType & {
    type: 'over';
  };

export type UnderChallengeItemType = ChallengeItemBase &
  CountableType & {
    type: 'under';
  };

export type CountableChallengeItemType =
  | OverChallengeItemType
  | UnderChallengeItemType;

export type ChallengeItemType =
  | CompleteChallengeItemType
  | CountableChallengeItemType;
