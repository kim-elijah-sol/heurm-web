import { ChallengeEditType } from '~/entities/challenge-edit';
import { MainType } from '~/entities/main';

export const filterValidHistory =
  (challengeItem: ChallengeEditType.GetChallengeItemResponseItem) =>
  (it: MainType.GetHistoryResponseItem): boolean => {
    if (challengeItem.days.length > 0) {
      const historyDay = new Date(it.date).getDay();
      if (challengeItem.days.includes(historyDay) === false) {
        return false;
      }
    }

    return true;
  };
