import clsx from 'clsx';
import {
  children,
  createSignal,
  Show,
  type Accessor,
  type Component,
  type JSX,
} from 'solid-js';
import { type ChallengeEditType } from '~/entities/challenge-edit';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import {
  NewChallengeItemMonthlyPatternSelect,
  NewChallengeItemRadio,
  NewChallengeItemWeeklyPatternSelect,
  NewChallengeItemYearlyPatternSelect,
} from '~/features/new-challenge-item/ui';
import { CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import type {
  ChallengeColor,
  ChallengeDay,
  ChallengeItemIntervalType,
  ChallengeItemMonthlyPattern,
  ChallengeItemRepeatType,
  ChallengeItemType,
  ChallengeItemWeeklyPattern,
  ChallengeItemYearlyPattern,
} from '~/shared/types';
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

  const [intervalType, setIntervalType] =
    createSignal<ChallengeItemIntervalType>('DAILY');

  const intervalTypeStep = () =>
    newChallengeItemConstant.INTERVAL_TYPES.indexOf(intervalType());

  const [repeatType, setRepeatType] =
    createSignal<ChallengeItemRepeatType>('EVERY');

  const repeatTypeStep = () =>
    newChallengeItemConstant.REPEAT_TYPES.indexOf(repeatType());

  const [repeat, setRepeat] = createSignal<string>('');

  const [rest, setRest] = createSignal<string>('');

  const [weeklyPattern, setWeeklyPattern] =
    createSignal<ChallengeItemWeeklyPattern>('Every Day');

  const [days, setDays] = createSignal<ChallengeDay[]>([]);

  const [monthlyPattern, setMonthlyPattern] =
    createSignal<ChallengeItemMonthlyPattern>('Every Week');

  const [yearlyPattern, setYearlyPattern] =
    createSignal<ChallengeItemYearlyPattern>('Every Month');

  const repeatUnit = () =>
    ((
      {
        DAILY: 'Day',
        WEEKLY: 'Week',
        MONTHLY: 'Month',
        YEARLY: 'Year',
      } as const
    )[intervalType()]);

  const everyRadioText = () => `Every ${repeatUnit()}`;

  const nRadioText = () => `Every N ${repeatUnit()}`;

  const getRepeatRadioText = (repeatType: ChallengeItemRepeatType) => {
    return repeatType === 'EVERY'
      ? everyRadioText()
      : repeatType === 'N'
      ? nRadioText()
      : 'N on, M off';
  };

  const restPlaceholderText = () => `M ${repeatUnit()}`;

  return (
    <Panel.Slide close={props.close}>
      {(close) => (
        <>
          <div class='absolute flex items-center justify-between left-0 right-0 top-0 p-4 pb-2 bg-white/75 backdrop-blur-sm z-10'>
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
          <div class='overflow-y-auto items-center pb-20 pt-[72px]'>
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

            <Show when={type() !== 'COMPLETE'}>
              <Form.Wrapper>
                <Form.Label>Target Count &nbsp;&&nbsp; Unit</Form.Label>
                <div class='flex w-full gap-2'>
                  <input
                    type='number'
                    pattern='[0-9]*'
                    inputMode='numeric'
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
            </Show>

            <Form.Divider />

            <Form.Wrapper>
              <Form.Label>Interval Type</Form.Label>
              <NewChallengeItemRadio step={intervalTypeStep}>
                {newChallengeItemConstant.INTERVAL_TYPES.map((it) => (
                  <NewChallengeItemRadio.Item
                    color={props.color}
                    checked={() => intervalType() === it}
                    onChange={() => setIntervalType(it)}
                    name='challenge-item-interval-type'
                    id={it.toLowerCase()}
                  >
                    <p class='font-semibold text-sm'>{it}</p>
                  </NewChallengeItemRadio.Item>
                ))}
              </NewChallengeItemRadio>
            </Form.Wrapper>

            <Show when={intervalType() !== 'DAILY'}>
              <Form.Wrapper>
                <Form.Label>Interval Pattern</Form.Label>

                <NewChallengeItemYearlyPatternSelect
                  yearlyPattern={yearlyPattern}
                  setYearlyPattern={setYearlyPattern}
                  color={props.color}
                />

                <NewChallengeItemMonthlyPatternSelect
                  monthlyPattern={monthlyPattern}
                  setMonthlyPattern={setMonthlyPattern}
                  color={props.color}
                />

                <NewChallengeItemWeeklyPatternSelect
                  weeklyPattern={weeklyPattern}
                  setWeeklyPattern={setWeeklyPattern}
                  days={days}
                  setDays={setDays}
                  color={props.color}
                />
              </Form.Wrapper>

              <Form.Divider />
            </Show>

            <Form.Wrapper>
              <Form.Label>Repeat Type</Form.Label>
              <NewChallengeItemRadio step={repeatTypeStep}>
                {newChallengeItemConstant.REPEAT_TYPES.map((it) => (
                  <NewChallengeItemRadio.Item
                    color={props.color}
                    checked={() => repeatType() === it}
                    onChange={() => setRepeatType(it)}
                    name='challenge-item-repeat-type'
                    id={it.toLowerCase()}
                  >
                    <p class='font-semibold text-sm'>
                      {getRepeatRadioText(it)}
                    </p>
                  </NewChallengeItemRadio.Item>
                ))}
              </NewChallengeItemRadio>

              {repeatType() !== 'EVERY' && (
                <div class='flex w-full gap-2 items-center justify-between'>
                  <p
                    class={clsx(
                      'text-sm font-semibold whitespace-nowrap pl-4 flex-1',
                      CHALLENGE_TEXT_COLOR_500[props.color()]
                    )}
                  >
                    {repeatType() === 'N' &&
                      nRadioText().replace('N', repeat() || 'N')}

                    {repeatType() === 'NM' && (
                      <>
                        {`${repeat() || 'N'} ${repeatUnit()} on,`}
                        <br />
                        {`${rest() || 'M'} ${repeatUnit()} off`}
                      </>
                    )}
                  </p>

                  <div class='flex gap-2 flex-2'>
                    <input
                      type='number'
                      pattern='[0-9]*'
                      inputMode='numeric'
                      class={inputBaseClassName}
                      placeholder={nRadioText().replace('Every', '')}
                      value={repeat()}
                      onInput={(e) => setRepeat(e.target.value)}
                    />
                    {repeatType() === 'NM' && (
                      <input
                        type='number'
                        pattern='[0-9]*'
                        inputMode='numeric'
                        class={inputBaseClassName}
                        placeholder={restPlaceholderText()}
                        value={rest()}
                        onInput={(e) => setRest(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              )}
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
  Divider: () => (
    <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white mt-2 mb-8' />
  ),
  LeftLabel: (props: { children: JSX.Element }) => {
    return (
      <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
        {children(() => props.children)()}
      </p>
    );
  },
};
