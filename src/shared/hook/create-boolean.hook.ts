import { createSignal } from 'solid-js';

export const createBoolean = (defaultBoolean?: boolean) => {
  const [boolean, setBoolean] = createSignal<boolean>(defaultBoolean ?? false);

  const setTrue = () => setBoolean(true);

  const setFalse = () => setBoolean(false);

  const toggle = () => setBoolean((boolean) => !boolean);

  return [boolean, setTrue, setFalse, toggle, setBoolean] as const;
};
