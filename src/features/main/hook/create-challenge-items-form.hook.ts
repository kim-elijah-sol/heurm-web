import { createSignal } from 'solid-js';
import {
  ChallengeItemForm,
  ChallengeItemType,
  CHALLENGE_DAY,
} from '~/entities/main';

export const createChallengeItemsForm = (
  _challengeItems: ChallengeItemForm[]
) => {
  const [challengeItems, setChallengeItems] = createSignal(_challengeItems);

  const handleChangeName = (id: number, name: string) => {
    setChallengeItems(
      challengeItems().map((it) =>
        it.id === id
          ? {
              ...it,
              name,
            }
          : it
      )
    );
  };

  const handleChangeDay = (id: number, day: (typeof CHALLENGE_DAY)[number]) => {
    setChallengeItems(
      challengeItems().map((it) =>
        it.id === id
          ? {
              ...it,
              day: it.day.includes(day)
                ? it.day.filter((it) => it !== day)
                : it.day.concat(day),
            }
          : it
      )
    );
  };

  const handleChangeTargetCount = (id: number, targetCount: number) => {
    setChallengeItems(
      challengeItems().map((it) =>
        it.id === id
          ? {
              ...it,
              targetCount,
            }
          : it
      )
    );
  };

  const handleNewChallengeItem = (challengeItem: ChallengeItemType) => {
    const newChallengeItem: ChallengeItemForm = {
      ...challengeItem,
      id: new Date().valueOf(),
      isNew: true,
    };

    setChallengeItems([newChallengeItem].concat(challengeItems()));
  };

  return {
    challengeItems,
    handleChangeDay,
    handleChangeName,
    handleChangeTargetCount,
    handleNewChallengeItem,
  };
};
