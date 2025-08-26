import { createSignal } from 'solid-js';
import { type Nullable } from '~/shared/types';

export const createSingleToggle = <T>(defaultSignal?: Nullable<T>) => {
  const [signal, _set] = createSignal<Nullable<T>>(defaultSignal ?? null);

  const set: (value: Nullable<T>) => void = (value) => {
    _set((prev) => (prev === value ? null : value));
  };

  return [signal, set] as const;
};
