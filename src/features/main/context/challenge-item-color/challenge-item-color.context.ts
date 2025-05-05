import { Accessor, createContext } from 'solid-js';
import { ChallengeColor } from '~/shared/model';

export const ChallengeItemColorContext =
  createContext<Accessor<ChallengeColor>>();
