import { createRoot, createSignal } from 'solid-js';
import { CHALLENGE_COLOR } from './challenge-color.constant';
import { CHALLENGE_DAY } from './challenge-day.constant';
import { ChallengeItemType } from './challenge-item.type';

type Challenge = {
  title: string;
  color: (typeof CHALLENGE_COLOR)[number];
  challengeItems: ChallengeItemType[];
};

export const useChallenges = createRoot(() => {
  const [challenges, setChallenges] = createSignal<Challenge[]>([
    {
      title: '💪 health',
      color: 'red',
      challengeItems: [
        {
          name: '3km running',
          type: 'complete',
          isCompleted: null,
          day: [...CHALLENGE_DAY],
        },
        {
          name: 'Push-up',
          type: 'over',
          targetCount: 200,
          count: null,
          day: ['MON', 'WED', 'FRI'],
        },
        {
          name: '100m sprint',
          type: 'under',
          targetCount: 15,
          count: null,
          day: ['TUE', 'THU', 'SAT'],
        },
      ],
    },
    {
      title: '💻 study',
      color: 'blue',
      challengeItems: [
        {
          name: 'Colour',
          type: 'complete',
          isCompleted: null,
          day: ['MON', 'WED', 'FRI'],
        },
        {
          name: 'Win Yourself',
          type: 'complete',
          isCompleted: null,
          day: ['TUE', 'THU', 'SAT'],
        },
        {
          name: 'Interaction Odyssey',
          type: 'complete',
          isCompleted: null,
          day: ['SUN'],
        },
      ],
    },
    {
      title: '🍀 daily',
      color: 'green',
      challengeItems: [
        {
          name: 'make the bed',
          type: 'complete',
          isCompleted: null,
          day: [...CHALLENGE_DAY],
        },
        {
          name: 'Drink water',
          type: 'over',
          targetCount: 1500,
          count: null,
          day: [...CHALLENGE_DAY],
        },
        {
          name: 'Smoking',
          type: 'under',
          targetCount: 15,
          count: null,
          day: [...CHALLENGE_DAY],
        },
      ],
    },
  ]);

  return {
    challenges,
  };
});
