import { ChallengeDay } from '~/shared/model';

type ChallengeItemBase = {
  name: string;
  day: ChallengeDay[];
};

type CountableType = {
  targetCount: number;
  count: number | null;
};

type CompletableType = {
  type: 'complete';
  isCompleted: boolean | null;
};

export type CompleteChallengeItem = ChallengeItemBase & CompletableType;

export type OverChallengeItem = ChallengeItemBase &
  CountableType & {
    type: 'over';
  };

export type UnderChallengeItem = ChallengeItemBase &
  CountableType & {
    type: 'under';
  };

export type CountableChallengeItem = OverChallengeItem | UnderChallengeItem;

export type ChallengeItem = CompleteChallengeItem | CountableChallengeItem;
