import { Accessor, Component, createMemo } from 'solid-js';
import { HELLO_WRITING } from '~/entities/main/constant';

type Props = {
  userName: Accessor<string>;
};

export const HelloUser: Component<Props> = (props) => {
  const helloWriting = createMemo(() => {
    return HELLO_WRITING[Math.floor(Math.random() * HELLO_WRITING.length)];
  });

  return (
    <div class='flex flex-col gap-1'>
      <p class='font-bold text-lg text-slate-900'>Hi, {props.userName()}!</p>
      <span class='font-semibold text-sm text-slate-700'>{helloWriting()}</span>
    </div>
  );
};
