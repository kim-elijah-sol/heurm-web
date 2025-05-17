import { createMemo, createRoot, createSignal } from 'solid-js';
import { CHALLENGE_DAY } from '~/shared/constant';
import { toast } from '~/shared/lib';
import { ChallengeColor, ChallengeItem, Nullable } from '~/shared/model';

type Challenge = {
  id: number;
  title: string;
  color: ChallengeColor;
  challengeItems: (ChallengeItem & { id: number })[];
};

export const useChallenges = createRoot(() => {
  const [challenges, setChallenges] = createSignal<Challenge[]>([
    {
      id: 1,
      title: '💪 health',
      color: 'red',
      challengeItems: [
        {
          id: 2,
          name: '3km running',
          type: 'complete',
          isCompleted: null,
          day: [...CHALLENGE_DAY],
        },
        {
          id: 3,
          name: 'Push-up',
          type: 'over',
          targetCount: 200,
          count: null,
          day: ['MON', 'WED', 'FRI'],
        },
        {
          id: 4,
          name: '100m sprint',
          type: 'under',
          targetCount: 15,
          count: null,
          day: ['TUE', 'THU', 'SAT'],
        },
      ],
    },
    {
      id: 5,
      title: '💻 study',
      color: 'blue',
      challengeItems: [
        {
          id: 6,
          name: 'Colour',
          type: 'complete',
          isCompleted: null,
          day: ['MON', 'WED', 'FRI'],
        },
        {
          id: 7,
          name: 'Win Yourself',
          type: 'complete',
          isCompleted: null,
          day: ['TUE', 'THU', 'SAT'],
        },
        {
          id: 8,
          name: 'Interaction Odyssey',
          type: 'complete',
          isCompleted: null,
          day: ['SUN'],
        },
      ],
    },
    {
      id: 9,
      title: '🍀 daily',
      color: 'green',
      challengeItems: [
        {
          id: 10,
          name: 'make the bed',
          type: 'complete',
          isCompleted: null,
          day: [...CHALLENGE_DAY],
        },
        {
          id: 11,
          name: 'Drink water',
          type: 'over',
          targetCount: 1500,
          count: null,
          day: [...CHALLENGE_DAY],
        },
        {
          id: 12,
          name: 'Smoking',
          type: 'under',
          targetCount: 15,
          count: null,
          day: [...CHALLENGE_DAY],
        },
      ],
    },
    {
      id: 15,
      title: '🎮 game',
      color: 'indigo',
      challengeItems: [],
    },
  ]);

  const handleChangeComplete =
    (challengeId: number) =>
    (challengeItemId: number, isCompleted: Nullable<boolean>) => {
      setChallenges(
        challenges().map((challenge) =>
          challenge.id === challengeId
            ? {
                ...challenge,
                challengeItems: challenge.challengeItems.map((challengeItem) =>
                  challengeItem.id === challengeItemId
                    ? {
                        ...challengeItem,
                        isCompleted,
                      }
                    : challengeItem
                ),
              }
            : challenge
        )
      );
    };

  const handleChangeCountable =
    (challengeId: number) =>
    (challengeItemId: number, count: Nullable<number>) => {
      setChallenges(
        challenges().map((challenge) =>
          challenge.id === challengeId
            ? {
                ...challenge,
                challengeItems: challenge.challengeItems.map((challengeItem) =>
                  challengeItem.id === challengeItemId
                    ? {
                        ...challengeItem,
                        count,
                      }
                    : challengeItem
                ),
              }
            : challenge
        )
      );
    };

  const progressChallengeItemCount = createMemo(() =>
    challenges().reduce(
      (acc, current) =>
        acc +
        current.challengeItems.filter((it) =>
          it.type === 'complete' ? it.isCompleted === null : it.count === null
        ).length,
      0
    )
  );

  const winChallengeItemCount = createMemo(() =>
    challenges().reduce(
      (acc, current) =>
        acc +
        current.challengeItems.filter((it) =>
          it.type === 'complete'
            ? it.isCompleted === true
            : it.type === 'over'
            ? (it.count ?? -Infinity) >= it.targetCount
            : (it.count ?? Infinity) <= it.targetCount
        ).length,
      0
    )
  );

  const loseChallengeItemCount = createMemo(
    () =>
      challenges().reduce(
        (acc, current) => acc + current.challengeItems.length,
        0
      ) -
      winChallengeItemCount() -
      progressChallengeItemCount()
  );

  const addNewChallenge = (challenge: Challenge) => {
    toast.open(`🎉 '${challenge.title}' Challenge is added!`);
    setChallenges([...challenges(), challenge]);
  };

  return {
    challenges,
    handleChangeComplete,
    handleChangeCountable,
    progressChallengeItemCount,
    winChallengeItemCount,
    loseChallengeItemCount,
    addNewChallenge,
  };
});
