import { createSignal } from 'solid-js';

export const createInput = (
  defaultValue: string = '',
  formatter?: (value: string) => string
) => {
  const [value, setValue] = createSignal<string>(defaultValue);

  const handleInputValue = (e: { target: HTMLInputElement }) =>
    setValue(formatter ? formatter(e.target.value) : e.target.value);

  return [value, handleInputValue] as const;
};
