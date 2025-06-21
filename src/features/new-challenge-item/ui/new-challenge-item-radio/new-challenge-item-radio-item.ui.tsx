import clsx from 'clsx';
import { children, type Accessor, type Component, type JSX } from 'solid-js';
import { CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import type { ChallengeColor } from '~/shared/types';

type Props = {
  color: Accessor<ChallengeColor>;
  checked: Accessor<boolean>;
  onChange?: () => void;
  onClick?: () => void;
  children: JSX.Element;
  name: string;
  id: string;
};

export const NewChallengeItemRadioItem: Component<Props> = (props) => {
  return (
    <label
      for={props.id}
      class={clsx(
        'flex-1 flex items-center justify-center rounded-[18px] transition-all active:bg-slate-200/70 active:scale-95 z-2',
        props.checked()
          ? CHALLENGE_TEXT_COLOR_500[props.color()]
          : 'text-gray-600'
      )}
    >
      <input
        type='radio'
        name={props.name}
        id={props.id}
        class='hidden'
        onChange={props.onChange}
        onClick={props.onClick}
        checked={props.checked()}
      />
      {children(() => props.children)()}
    </label>
  );
};
