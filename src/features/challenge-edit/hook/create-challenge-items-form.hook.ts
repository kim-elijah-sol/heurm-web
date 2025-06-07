import { Accessor, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ChallengeDay } from '~/shared/model';

type Base = {
  id: string;
  name: string;
  days: ChallengeDay[];
  isNew?: boolean;
};

type ChallengeItemForm = Base &
  (
    | {
        type: 'COMPLETE';
      }
    | {
        type: 'OVER' | 'UNDER';
        targetCount: number;
      }
  );

export const createChallengeItemsForm = (
  _challengeItems: Accessor<ChallengeItemForm[]>
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

  const handleNewChallengeItem = (challengeItem: ChallengeItemForm) => {
    const newChallengeItem: ChallengeItemForm = {
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
    handleNewChallengeItem,
  };
};
