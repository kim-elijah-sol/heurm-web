import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { loginSchema } from '~/entities/login';
import type { RollingDisplayType } from '~/shared/types';
import { Check, GlassInput } from '~/shared/ui';
import { getLoginHelperFormStepDisplayClass } from '../../fx';

type Props = {
  displayType: Accessor<RollingDisplayType>;
  password: Accessor<string>;
  setPassword: Setter<string>;
  isSummitable: Accessor<boolean>;
};

export const PasswordStep: Component<Props> = (props) => {
  const conditionBaseClassName = 'flex-1 whitespace-nowrap text-sm';

  const getConditionClassName = (issue: string) => {
    const result = loginSchema.postLoginRequestSchema.shape.password.safeParse(
      props.password()
    );
    const issues = result.success
      ? []
      : result.error.issues.map((i) => i.message);

    return issues.some((_issue) => _issue.includes(issue))
      ? 'text-gray-400 font-medium'
      : 'text-blue-500 font-semibold';
  };

  return (
    <div
      class={clsx(
        'flex flex-col items-center transition-all duration-300 gap-8 absolute top-1/2 left-1/2 -translate-x-1/2 w-full',
        getLoginHelperFormStepDisplayClass(props.displayType())
      )}
    >
      <div class='flex flex-col gap-2 w-full'>
        <GlassInput
          type='password'
          class='text-slate-800 text-xl h-16 font-semibold w-full placeholder:text-gray-400 text-center'
          placeholder='password'
          value={props.password()}
          onInput={(e) => props.setPassword(e.target.value)}
        />

        <div class='flex flex-col gap-1 items-center px-4'>
          <div class='flex gap-4 w-full'>
            <p
              class={clsx(
                conditionBaseClassName,
                'text-right',
                getConditionClassName('characters long')
              )}
            >
              Length : 8 ~ 16
            </p>
            <p
              class={clsx(
                conditionBaseClassName,
                'text-left',
                getConditionClassName('letter')
              )}
            >
              Include letters
            </p>
          </div>
          <div class='flex gap-4 w-full'>
            <p
              class={clsx(
                conditionBaseClassName,
                'text-right',
                getConditionClassName('number')
              )}
            >
              Include numbers
            </p>
            <p
              class={clsx(
                conditionBaseClassName,
                'text-left',
                getConditionClassName('special')
              )}
            >
              Include special text
            </p>
          </div>
        </div>
      </div>

      <button
        type='submit'
        disabled={!props.isSummitable()}
        class={clsx(
          'p-[18px] rounded-[42%] transition-all',
          !props.isSummitable()
            ? 'bg-gray-300'
            : 'bg-green-400 active:bg-green-500 active:scale-90'
        )}
      >
        <Check />
      </button>
    </div>
  );
};
