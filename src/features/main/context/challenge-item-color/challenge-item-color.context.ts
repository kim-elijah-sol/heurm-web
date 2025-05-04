import { Accessor, createContext } from 'solid-js';
import { ChallengeColor } from '~/entities/main';

export const ChallengeItemColorContext =
  createContext<Accessor<ChallengeColor>>();
