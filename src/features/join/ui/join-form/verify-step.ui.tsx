import clsx from 'clsx';
import { Accessor, Setter, type Component } from 'solid-js';
import { RollingDisplayType } from '~/shared/model';
import { Check, Send } from '~/shared/ui';
import { getJoinStepDisplayClass } from '../../fx';

type Props = {
  displayType: Accessor<RollingDisplayType>;
  verifyCode: Accessor<string>;
  setVerifyCode: Setter<string>;
  isSummitable: Accessor<boolean>;

  onResend: () => void;
  restResendSecond: Accessor<number>;
};

export const VerifyStep: Component<Props> = (props) => {
  const isResenable = () => props.restResendSecond() === 0;

  const percent = () => 1 - props.restResendSecond() / 60;
  const degree = () => percent() * 360;

  return (
    <div
      class={clsx(
        'flex flex-col items-center transition-all duration-300 gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 w-full',
        getJoinStepDisplayClass(props.displayType())
      )}
    >
      <input
        type='string'
        class='text-slate-800 text-2xl h-14 font-semibold w-full placeholder:text-gray-400 text-center bg-gray-200/50 rounded-[12px] backdrop-blur-md'
        placeholder='verify code (6-digit)'
        value={props.verifyCode()}
        onInput={(e) =>
          props.setVerifyCode(e.target.value.replace(/[^0-9]/g, ''))
        }
        maxlength={6}
      />

      <div class='flex gap-6'>
        <button
          type='button'
          disabled={!isResenable()}
          class={clsx(
            'p-4 rounded-[35%] transition-all bg-gray-300 overflow-hidden relative',
            isResenable() && 'active:scale-90'
          )}
          onClick={props.onResend}
        >
          <div
            class='transition-all absolute left-1/2 top-1/2 -translate-1/2 w-full h-full'
            style={{
              background: `conic-gradient(oklch(70.7% 0.165 254.624) ${degree()}deg, transparent ${degree()}deg)`,
            }}
          />
          <Send />
        </button>

        <button
          type='submit'
          disabled={!props.isSummitable()}
          class={clsx(
            'p-4 rounded-[35%] transition-all',
            !props.isSummitable()
              ? 'bg-gray-300'
              : 'bg-green-400 active:bg-green-500 active:scale-90'
          )}
        >
          <Check />
        </button>
      </div>
    </div>
  );
};
