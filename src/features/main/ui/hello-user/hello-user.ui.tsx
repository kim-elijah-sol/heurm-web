import { createMemo, type Accessor, type Component } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { getRandomItem } from '~/shared/fx';

type Props = {
  userName: Accessor<string | undefined>;
};

export const HelloUser: Component<Props> = (props) => {
  const helloWriting = createMemo(() =>
    getRandomItem(mainConstant.HELLO_WRITING)
  );

  const userName = () => props.userName();

  return (
    <div class='flex flex-col gap-1'>
      <p class='font-bold text-lg text-slate-900'>
        Hi, {userName() ? `${userName()}!` : ''}
      </p>
      <span class='font-semibold text-sm text-slate-700'>{helloWriting()}</span>
    </div>
  );
};
