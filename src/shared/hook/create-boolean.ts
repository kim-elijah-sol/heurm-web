import { createMemo, createSignal } from 'solid-js';

export const createBoolean = (defaultBoolean?: boolean) => {
  const [boolean, setBoolean] = createSignal<boolean>(defaultBoolean ?? false);

  const setTrue = () => createMemo(() => setBoolean(true));

  const setFalse = () => createMemo(() => setBoolean(false));

  const toggle = () => createMemo(() => setBoolean((boolean) => !boolean));

  return [boolean, setTrue, setFalse, toggle, setBoolean] as const;
};
