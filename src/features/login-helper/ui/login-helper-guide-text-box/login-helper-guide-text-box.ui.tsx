import clsx from 'clsx';
import {
  createEffect,
  createSignal,
  on,
  type Accessor,
  type Component,
  type JSX,
} from 'solid-js';
import { type LoginHelperType } from '~/entities/login-helper';
import {
  getLoginHelperFormStepDisplayClass,
  getLoginHelperStepDisplayType,
} from '~/features/login-helper/fx';
import './login-helper-guide-text-box.ui.css';

type Props = {
  step: Accessor<LoginHelperType.LoginHelperStep>;
  getStepValue: (step: LoginHelperType.LoginHelperStep) => number;

  email: JSX.Element;
  password: JSX.Element;
  verify: JSX.Element;
  done: JSX.Element;
};

export const LoginHelperGuideTextBox: Component<Props> = (props) => {
  const loginHelperGuideTextClassName =
    'text-center text-gray-500 font-semibold text-xl transition-all duration-300 absolute whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2';

  const [height, setHeight] = createSignal<number>(0);

  const getStepDisplayType = (step: LoginHelperType.LoginHelperStep) =>
    getLoginHelperStepDisplayType(props.step(), step)(props.getStepValue);

  createEffect(
    on(props.step, () => {
      setHeight(
        document.querySelector('.login-helper-guide-text-current')!.clientHeight
      );
    })
  );

  return (
    <div
      class='login-helper-guide-text-box overflow-y-hidden transition-all duration-300 w-full relative mb-10'
      style={{
        height: `${height()}px`,
      }}
    >
      <p
        class={clsx(
          loginHelperGuideTextClassName,
          getLoginHelperFormStepDisplayClass(getStepDisplayType('email'))
        )}
      >
        {props.email}
      </p>
      <p
        class={clsx(
          loginHelperGuideTextClassName,
          getLoginHelperFormStepDisplayClass(getStepDisplayType('password'))
        )}
      >
        {props.password}
      </p>
      <p
        class={clsx(
          loginHelperGuideTextClassName,
          getLoginHelperFormStepDisplayClass(getStepDisplayType('verify'))
        )}
      >
        {props.verify}
      </p>
      <p
        class={clsx(
          loginHelperGuideTextClassName,
          getLoginHelperFormStepDisplayClass(getStepDisplayType('done'))
        )}
      >
        {props.done}
      </p>
    </div>
  );
};
