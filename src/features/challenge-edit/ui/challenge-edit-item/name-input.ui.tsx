import clsx from 'clsx';
import { type Component } from 'solid-js';
import { challengeEditHook } from '~/entities/challenge-edit';
import { CHALLENGE_200_BG_COLOR } from '~/shared/constant';

type Props = {
  name: string;
  onChangeName: (name: string) => void;
};

export const NameInput: Component<Props> = (props) => {
  const color = challengeEditHook.useChallengeItemColor();

  return (
    <input
      type='text'
      class={clsx(
        'font-semibold px-3 py-2 rounded-[16px] w-[100%] transition-all',
        CHALLENGE_200_BG_COLOR[color()]
      )}
      value={props.name}
      onInput={(e) => props.onChangeName(e.target.value)}
    />
  );
};
