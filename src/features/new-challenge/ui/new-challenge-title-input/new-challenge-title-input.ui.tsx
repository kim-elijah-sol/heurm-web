import type { Component, JSX } from 'solid-js';
import { GlassInput } from '~/shared/ui';

type Props = Omit<
  JSX.HTMLElementTags['input'],
  'type' | 'class' | 'placeholder'
>;

export const NewChallengeTitleInput: Component<Props> = (props) => {
  return (
    <GlassInput
      type='text'
      class='text-slate-800 text-3xl h-16 font-semibold placeholder:text-gray-400 mb-10 text-center w-full'
      placeholder='Challenge Title'
      {...props}
    />
  );
};
