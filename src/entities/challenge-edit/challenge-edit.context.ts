import { type Accessor, createContext } from 'solid-js';
import { type ChallengeColor } from '~/shared/types';

export const ChallengeItemColorContext =
  createContext<Accessor<ChallengeColor>>();
