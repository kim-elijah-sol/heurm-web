import { useContext } from 'solid-js';
import { ChallengeItemColorContext } from './challenge-edit.context';

export const useChallengeItemColor = () => {
  const challengeItemColor = useContext(ChallengeItemColorContext);

  if (!challengeItemColor)
    throw new Error('ChallengeItemColorContext is not defiend');

  return challengeItemColor;
};
