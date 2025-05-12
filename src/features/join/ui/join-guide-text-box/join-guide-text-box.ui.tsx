import clsx from 'clsx';
import { Accessor, Component } from 'solid-js';
import { JoinStep } from '~/entities/join/model';
import './join-guide-text-box.ui.css';

type Props = {
  step: Accessor<JoinStep>;
};

export const JoinGuideTextBox: Component<Props> = (props) => {
  const joinGuideTextClassName =
    'text-center text-gray-500 font-semibold text-xl transition-all duration-300 absolute whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2';

  const currentStepClassName = '-translate-y-1/2 opacity-100';

  const readyStepClassName = 'translate-y-full opacity-0';

  const endStepClassName = '-translate-y-full opacity-0';

  return (
    <div
      class='join-guide-text-box overflow-y-hidden transition-all duration-300 w-full relative'
      style={{
        height: props.step() === 'email' ? '28px' : '56px',
      }}
    >
      <p
        class={clsx(
          joinGuideTextClassName,
          props.step() === 'email' ? currentStepClassName : endStepClassName,
          'transalte-[-50%_-50%]'
        )}
      >
        Enter your join email
      </p>
      <p
        class={clsx(
          joinGuideTextClassName,
          props.step() === 'password'
            ? currentStepClassName
            : props.step() === 'email'
            ? readyStepClassName
            : endStepClassName
        )}
      >
        Set a password to
        <br />
        secure your account
      </p>
      <p
        class={clsx(
          joinGuideTextClassName,
          props.step() === 'verify'
            ? currentStepClassName
            : props.step() === 'done'
            ? endStepClassName
            : readyStepClassName
        )}
      >
        Enter the code
        <br />
        we've sent to your email
      </p>
    </div>
  );
};
