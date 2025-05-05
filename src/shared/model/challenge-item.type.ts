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
