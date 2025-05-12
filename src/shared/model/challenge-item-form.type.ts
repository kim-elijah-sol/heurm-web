import { ChallengeItem } from './challenge-item.type';

export type ChallengeItemForm = ChallengeItem & {
  id: number;
  isNew?: boolean;
};
