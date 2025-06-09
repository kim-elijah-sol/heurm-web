import { Accessor, createContext } from 'solid-js';
import { ChallengeColor } from '~/shared/types';

export const ChallengeItemColorContext =
  createContext<Accessor<ChallengeColor>>();
