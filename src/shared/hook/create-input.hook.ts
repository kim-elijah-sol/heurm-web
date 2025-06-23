import { createSignal } from 'solid-js';

export const createInput = (defaultValue: string = '') => {
  const [value, setValue] = createSignal<string>(defaultValue);

  const handleInputValue = (e: { target: HTMLInputElement }) =>
    setValue(e.target.value);

  return [value, handleInputValue] as const;
};
