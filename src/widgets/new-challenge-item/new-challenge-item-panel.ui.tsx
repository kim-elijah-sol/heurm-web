import clsx from 'clsx';
import {
  children,
  createSignal,
  type Accessor,
  type Component,
  type JSX,
} from 'solid-js';
import { ChallengeEditType } from '~/entities/challenge-edit';
import { NewChallengeItemRadio } from '~/features/new-challenge-item/ui';
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

  const typeStep = () =>
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
              <NewChallengeItemRadio step={typeStep}>
                <NewChallengeItemRadio.Item
                  color={props.color}
                  checked={() => type() === 'COMPLETE'}
                  onChange={() => setType('COMPLETE')}
                  name='challenge-item-type'
                  id='complete'
                >
                  <CheckCheck
                    size={28}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </NewChallengeItemRadio.Item>
                <NewChallengeItemRadio.Item
                  color={props.color}
                  checked={() => type() === 'OVER'}
                  onChange={() => setType('OVER')}
                  name='challenge-item-type'
                  id='over'
                >
                  <ChevronsUp
                    size={28}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </NewChallengeItemRadio.Item>
                <NewChallengeItemRadio.Item
                  color={props.color}
                  checked={() => type() === 'UNDER'}
                  onChange={() => setType('UNDER')}
                  name='challenge-item-type'
                  id='under'
                >
                  <ChevronsDown
                    size={28}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </NewChallengeItemRadio.Item>
              </NewChallengeItemRadio>
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

            <Form.Wrapper>
              <Form.Label>Interval Type</Form.Label>
            </Form.Wrapper>
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
