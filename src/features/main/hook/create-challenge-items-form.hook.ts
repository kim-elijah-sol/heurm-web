import { createStore } from 'solid-js/store';
import { ChallengeItemForm, ChallengeItemType } from '~/entities/main';
import { ChallengeDay } from '~/shared/model';

export const createChallengeItemsForm = (
  _challengeItems: ChallengeItemForm[]
) => {
  const [challengeItems, setChallengeItems] = createStore(_challengeItems);

  const handleChangeName = (id: number, name: string) => {
    setChallengeItems(
      challengeItems.findIndex((it) => it.id === id),
      'name',
      name
    );
  };

  const handleChangeDay = (id: number, day: ChallengeDay) => {
    setChallengeItems(
      challengeItems.findIndex((it) => it.id === id),
      'day',
      (days) =>
        days.includes(day) ? days.filter((it) => it !== day) : [...days, day]
    );
  };

  const handleChangeTargetCount = (id: number, targetCount: number) => {
    setChallengeItems(
      challengeItems.findIndex((it) => it.id === id),
      'targetCount' as any,
      targetCount
    );
  };

  const handleNewChallengeItem = (challengeItem: ChallengeItemType) => {
    const newChallengeItem: ChallengeItemForm = {
      ...challengeItem,
      id: new Date().valueOf(),
      isNew: true,
    };

    setChallengeItems([newChallengeItem, ...challengeItems]);
  };

  return {
    challengeItems,
    handleChangeDay,
    handleChangeName,
    handleChangeTargetCount,
    handleNewChallengeItem,
  };
};
