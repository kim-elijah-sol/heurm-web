import { Accessor, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ChallengeEditType } from '~/entities/challenge-edit';
import { ChallengeDay } from '~/shared/model';

export const createChallengeItemsForm = (
  _challengeItems: Accessor<ChallengeEditType.ChallengeItemForm[]>
) => {
  const [challengeItems, setChallengeItems] = createStore([
    ..._challengeItems(),
  ]);

  const handleChangeName = (id: string, name: string) => {
    setChallengeItems(
      challengeItems.findIndex((it) => it.id === id),
      'name',
      name
    );
  };

  const handleChangeDay = (id: string, day: ChallengeDay) => {
    setChallengeItems(
      challengeItems.findIndex((it) => it.id === id),
      'days',
      (days) =>
        days.includes(day) ? days.filter((it) => it !== day) : [...days, day]
    );
  };

  const handleChangeTargetCount = (id: string, targetCount: number) => {
    setChallengeItems(
      challengeItems.findIndex((it) => it.id === id),
      'targetCount' as any,
      targetCount
    );
  };

  const handleDeleteChallengeItem = (id: string) => {
    const targetChallengeItemIndex = challengeItems.findIndex(
      (it) => it.id === id
    );

    if (challengeItems[targetChallengeItemIndex].isNew) {
      setChallengeItems((challengeItems) =>
        challengeItems.filter((it) => it.id !== id)
      );
    } else {
      setChallengeItems(targetChallengeItemIndex, 'isDelete', true);
    }
  };

  const handleNewChallengeItem = (
    challengeItem: ChallengeEditType.ChallengeItemForm
  ) => {
    const newChallengeItem: ChallengeEditType.ChallengeItemForm = {
      ...challengeItem,
      id: new Date().valueOf().toString(),
      isNew: true,
    };

    setChallengeItems([newChallengeItem, ...challengeItems]);
  };

  createEffect(() => {
    setChallengeItems([..._challengeItems()]);
  });

  return {
    challengeItems,
    handleChangeDay,
    handleChangeName,
    handleChangeTargetCount,
    handleDeleteChallengeItem,
    handleNewChallengeItem,
  };
};
