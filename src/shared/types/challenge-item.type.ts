import type { FlowDay, Nullable } from '~/shared/types';

type ChallengeItemBase = {
  name: string;
  day: FlowDay[];
};

type CountableType = {
  targetCount: number;
  count: Nullable<number>;
};

type CompletableType = {
  type: 'complete';
  isCompleted: Nullable<boolean>;
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
