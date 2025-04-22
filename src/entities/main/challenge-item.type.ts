type CountableType = {
  targetCount: number;
  count: number | null;
};

export type ChallengeItemType = {
  name: string;
} & (
  | {
      type: 'complete';
      isCompleted: boolean | null;
    }
  | ({
      type: 'over';
    } & CountableType)
  | ({
      type: 'under';
    } & CountableType)
);
