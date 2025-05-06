import type { JSX } from 'solid-js';

type Props = Omit<
  JSX.HTMLElementTags['input'],
  'type' | 'class' | 'placeholder'
>;

export const NewChallengeTitleInput = (props: Props) => {
  return (
    <input
      type='text'
      class='text-slate-800 text-3xl h-10 font-semibold placeholder:text-gray-400 mb-10 text-center w-full'
      placeholder='Challenge Title'
      {...props}
    />
  );
};
