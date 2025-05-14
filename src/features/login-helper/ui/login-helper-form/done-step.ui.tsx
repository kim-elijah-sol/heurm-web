import clsx from 'clsx';
import { Accessor, Component } from 'solid-js';
import { RollingDisplayType } from '~/shared/model';
import { Login } from '~/shared/ui';
import { getLoginHelperFormStepDisplayClass } from '../../fx';

type Props = {
  displayType: Accessor<RollingDisplayType>;
  onLogin: () => void;
};

export const DoneStep: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'flex flex-col items-center transition-all duration-300 gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 w-full',
        getLoginHelperFormStepDisplayClass(props.displayType())
      )}
    >
      <button
        type='button'
        onClick={props.onLogin}
        class='p-4 rounded-[35%] transition-all bg-green-400 active:bg-green-500 active:scale-90'
      >
        <Login />
      </button>
    </div>
  );
};
