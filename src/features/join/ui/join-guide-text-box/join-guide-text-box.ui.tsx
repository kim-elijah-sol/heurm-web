import clsx from 'clsx';
import { Accessor, Component } from 'solid-js';
import { JoinStep } from '~/entities/join/model';
import {
  getJoinGuideTextBoxHeight,
  getJoinStepDisplayClass,
  getJoinStepDisplayType,
} from '../../fx';
import './join-guide-text-box.ui.css';

type Props = {
  step: Accessor<JoinStep>;
};

export const JoinGuideTextBox: Component<Props> = (props) => {
  const joinGuideTextClassName =
    'text-center text-gray-500 font-semibold text-xl transition-all duration-300 absolute whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2';

  return (
    <div
      class='join-guide-text-box overflow-y-hidden transition-all duration-300 w-full relative mb-10'
      style={{
        height: `${getJoinGuideTextBoxHeight(props.step())}px`,
      }}
    >
      <p
        class={clsx(
          joinGuideTextClassName,
          getJoinStepDisplayClass(getJoinStepDisplayType(props.step(), 'email'))
        )}
      >
        Enter your join email
      </p>
      <p
        class={clsx(
          joinGuideTextClassName,
          getJoinStepDisplayClass(
            getJoinStepDisplayType(props.step(), 'password')
          )
        )}
      >
        Set a password to
        <br />
        secure your account
      </p>
      <p
        class={clsx(
          joinGuideTextClassName,
          getJoinStepDisplayClass(
            getJoinStepDisplayType(props.step(), 'verify')
          )
        )}
      >
        Enter the code
        <br />
        we've sent to your email
      </p>
      <p
        class={clsx(
          joinGuideTextClassName,
          getJoinStepDisplayClass(getJoinStepDisplayType(props.step(), 'done'))
        )}
      >
        Thanks for join
        <br />
        Win Yourself!
        <br />
        Let’s start building
        <br />
        your winning habits today!
      </p>
    </div>
  );
};
