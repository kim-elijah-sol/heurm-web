import { ChallengeItemType } from './challenge-item.type';

export type ChallengeItemForm = ChallengeItemType & {
  id: number;
  isNew?: boolean;
};
