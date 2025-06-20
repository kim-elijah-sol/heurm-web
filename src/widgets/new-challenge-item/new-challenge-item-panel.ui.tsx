import clsx from 'clsx';
import {
  children,
  createSignal,
  type Accessor,
  type Component,
  type JSX,
} from 'solid-js';
import { ChallengeEditType } from '~/entities/challenge-edit';
import { CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import type { ChallengeColor, ChallengeItemType } from '~/shared/types';
import { CheckCheck, ChevronsDown, ChevronsUp, Panel, X } from '~/shared/ui';

type Props = {
  onSubmit: (challengeItem: ChallengeEditType.ChallengeItemForm) => void;
  close: () => void;
  color: Accessor<ChallengeColor>;
};

export const NewChallengeItemPanel: Component<Props> = (props) => {
  const inputBaseClassName =
    'font-semibold px-4 py-4 rounded-[24px] w-full transition-all bg-slate-100 focus:bg-slate-200 placeholder:text-gray-400';

  const [name, setName] = createSignal<string>('');

  const [type, setType] =
    createSignal<Uppercase<ChallengeItemType>>('COMPLETE');

  const typeIndicatorLevel = () =>
    type() === 'COMPLETE' ? 0 : type() === 'OVER' ? 1 : 2;

  return (
    <Panel.Slide close={props.close}>
      {(close) => (
        <>
          <div class='absolute flex items-center justify-between left-0 right-0 top-0 p-4 pb-2 bg-white/75 backdrop-blur-sm'>
            <p class='font-semibold text-2xl'>
              {name().trim().length > 0 ? name().trim() : 'New Challenge Item'}
            </p>
            <button
              onClick={close}
              class='p-[7px] rounded-[42%] transition-all active:scale-[.95] bg-red-400 active:bg-red-500'
            >
              <X size={30} />
            </button>
          </div>
          <div class='flex-1 overflow-y-auto flex flex-col items-center pb-20 pt-[72px]'>
            <Form.Wrapper>
              <Form.Label>Name</Form.Label>
              <input
                type='text'
                class={inputBaseClassName}
                value={name()}
                onInput={(e) => setName(e.target.value)}
                placeholder='Challenge Item Name'
              />
            </Form.Wrapper>
            <Form.Wrapper>
              <Form.Label>Type</Form.Label>
              <div class='flex relative w-full h-14 bg-slate-100 rounded-[24px] p-[6px] gap-2'>
                <label
                  for='complete'
                  class={clsx(
                    'flex-1 flex items-center justify-center rounded-[18px] transition-all active:bg-slate-200/70 active:scale-95 z-2',
                    type() === 'COMPLETE'
                      ? CHALLENGE_TEXT_COLOR_500[props.color()]
                      : 'text-gray-600'
                  )}
                >
                  <input
                    type='radio'
                    name='challenge-item-type'
                    id='complete'
                    class='hidden'
                    onChange={() => setType('COMPLETE')}
                  />
                  <CheckCheck
                    size={28}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </label>
                <label
                  for='over'
                  class={clsx(
                    'flex-1 flex items-center justify-center rounded-[18px] transition-all active:bg-slate-200/70 active:scale-95 z-2',
                    type() === 'OVER'
                      ? CHALLENGE_TEXT_COLOR_500[props.color()]
                      : 'text-gray-600'
                  )}
                >
                  <input
                    type='radio'
                    name='challenge-item-type'
                    id='over'
                    class='hidden'
                    onChange={() => setType('OVER')}
                  />
                  <ChevronsUp
                    size={28}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </label>
                <label
                  for='under'
                  class={clsx(
                    'flex-1 flex items-center justify-center rounded-[18px] transition-all active:bg-slate-200/70 active:scale-95 z-2',
                    type() === 'UNDER'
                      ? CHALLENGE_TEXT_COLOR_500[props.color()]
                      : 'text-gray-600'
                  )}
                >
                  <input
                    type='radio'
                    name='challenge-item-type'
                    id='under'
                    class='hidden'
                    onChange={() => setType('UNDER')}
                  />
                  <ChevronsDown
                    size={28}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </label>
                <div
                  class='absolute top-[6px] bottom-[6px] bg-slate-200 transition-all duration-300 rounded-[18px]'
                  style={{
                    width: 'calc(calc(100% - 28px) / 3)',
                    left: `calc(calc(calc(calc(100% - 28px) / 3) * ${typeIndicatorLevel()}) + ${
                      typeIndicatorLevel() * 8 + 6
                    }px)`,
                  }}
                ></div>
              </div>
            </Form.Wrapper>
            {type() !== 'COMPLETE' && (
              <Form.Wrapper>
                <Form.Label>Target Count &nbsp;&&nbsp; Unit</Form.Label>
                <div class='flex w-full gap-2'>
                  <input
                    type='text'
                    class={clsx(inputBaseClassName, 'flex-2')}
                    placeholder='Target Count'
                  />
                  <input
                    type='text'
                    class={clsx(inputBaseClassName, 'flex-1')}
                    placeholder='Unit'
                  />
                </div>
              </Form.Wrapper>
            )}

            <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white mt-2 mb-8' />
          </div>

          <Panel.CTAButton color={props.color}>Add</Panel.CTAButton>
        </>
      )}
    </Panel.Slide>
  );
};

const Form = {
  Wrapper: (props: { children: JSX.Element }) => {
    return (
      <div class='flex flex-col gap-2 mb-6 w-full'>
        {children(() => props.children)()}
      </div>
    );
  },
  Label: (props: { children: JSX.Element }) => {
    return (
      <p class='font-semibold text-gray-700'>
        {children(() => props.children)()}
      </p>
    );
  },
};
