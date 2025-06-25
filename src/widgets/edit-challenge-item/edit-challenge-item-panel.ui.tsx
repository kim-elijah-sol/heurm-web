import clsx from 'clsx';
import {
  children,
  Match,
  Show,
  Switch,
  type Accessor,
  type Component,
  type JSX,
} from 'solid-js';
import { ChallengeEditType } from '~/entities/challenge-edit';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import { createEditChallengeItemForm } from '~/features/new-challenge-item/hook';
import {
  NewChallengeItemDatePicker,
  NewChallengeItemMonthlyPatternSelect,
  NewChallengeItemRadio,
  NewChallengeItemWeeklyPatternSelect,
  NewChallengeItemYearlyPatternSelect,
} from '~/features/new-challenge-item/ui';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_BORDER_COLOR_400,
  CHALLENGE_TEXT_COLOR_500,
} from '~/shared/constant';
import { toast } from '~/shared/lib';
import type { ChallengeColor } from '~/shared/types';
import {
  Check,
  CheckCheck,
  ChevronsDown,
  ChevronsUp,
  MoveRight,
  Panel,
  X,
} from '~/shared/ui';

type Props = {
  close: () => void;
  color: Accessor<ChallengeColor>;
  challengeId: Accessor<string>;
  challengeItem: Accessor<ChallengeEditType.GetChallengeItemResponseItem>;
};

export const EditChallengeItemPanel: Component<Props> = (props) => {
  const inputBaseClassName =
    'font-semibold px-4 py-4 rounded-[24px] w-full transition-all bg-slate-100 focus:bg-slate-200 placeholder:text-gray-400';

  const {
    name,
    handleInputName,
    nameTitle,
    type,
    setType,
    typeStep,
    targetCount,
    handleInputTargetCount,
    unit,
    handleInputUnit,
    intervalType,
    setIntervalType,
    intervalTypeStep,
    repeatType,
    setRepeatType,
    repeatTypeStep,
    repeat,
    setRepeat,
    rest,
    setRest,
    weeklyPattern,
    setWeeklyPattern,
    days,
    setDays,
    monthlyPattern,
    setMonthlyPattern,
    dates,
    setDates,
    weeks,
    setWeeks,
    yearlyPattern,
    setYearlyPattern,
    months,
    setMonths,
    accumulate,
    setAccumulate,
    accumulateType,
    setAccumulateType,
    accumulateTypes,
    accumulateTypeStep,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    repeatUnit,
    nRadioText,
    getRepeatRadioText,
    restPlaceholderText,
    disabled,
    handleSave,
  } = createEditChallengeItemForm(props.challengeId, props.challengeItem);

  const yearlyPatternSelect = () => (
    <NewChallengeItemYearlyPatternSelect
      yearlyPattern={yearlyPattern}
      setYearlyPattern={setYearlyPattern}
      color={props.color}
      months={months}
      setMonths={setMonths}
    />
  );

  const monthlyPatternSelect = () => (
    <NewChallengeItemMonthlyPatternSelect
      monthlyPattern={monthlyPattern}
      setMonthlyPattern={setMonthlyPattern}
      color={props.color}
      dates={dates}
      setDates={setDates}
      weeks={weeks}
      setWeeks={setWeeks}
    />
  );

  const weeklyPatternSelect = () => (
    <NewChallengeItemWeeklyPatternSelect
      weeklyPattern={weeklyPattern}
      setWeeklyPattern={setWeeklyPattern}
      days={days}
      setDays={setDays}
      color={props.color}
    />
  );

  const monthlyPatternSelects = () => (
    <>
      {monthlyPatternSelect()}

      <Show when={monthlyPattern() !== 'Select Date'}>
        {weeklyPatternSelect()}
      </Show>
    </>
  );

  return (
    <Panel.Slide close={props.close} class='px-0'>
      {(close) => (
        <>
          <div class='absolute flex items-center justify-between left-0 right-0 top-0 p-4 pb-2 bg-white/75 backdrop-blur-sm z-10'>
            <p class='font-semibold text-2xl'>{nameTitle()}</p>
            <button
              onClick={close}
              class='p-[7px] rounded-[42%] transition-all active:scale-[.95] bg-red-400 active:bg-red-500'
            >
              <X size={30} />
            </button>
          </div>
          <div class='overflow-y-auto items-center pb-20 pt-[72px] px-4'>
            <Form.Wrapper>
              <Form.Label>Name</Form.Label>
              <input
                type='text'
                class={inputBaseClassName}
                value={name()}
                onInput={handleInputName}
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
                    size={24}
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
                    size={24}
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
                    size={24}
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
                    value={targetCount()}
                    onInput={handleInputTargetCount}
                  />
                  <input
                    type='text'
                    class={clsx(inputBaseClassName, 'flex-1')}
                    placeholder='Unit'
                    value={unit()}
                    onInput={handleInputUnit}
                  />
                </div>

                <label for='accumulate' class='mt-2'>
                  <input
                    type='checkbox'
                    name='accumulate'
                    id='accumulate'
                    class='hidden'
                    checked={accumulate()}
                    onChange={(e) => setAccumulate(e.target.checked)}
                  />
                  <div class='flex items-center gap-2'>
                    <div
                      class={clsx(
                        'p-[2px] rounded-[42%] border-2 transition-all',
                        accumulate()
                          ? clsx(
                              CHALLENGE_400_BG_COLOR[props.color()],
                              CHALLENGE_BORDER_COLOR_400[props.color()],
                              'text-white'
                            )
                          : 'border-gray-200 text-gray-300'
                      )}
                    >
                      <Check size={16} strokeWidth={3} stroke='currentColor' />
                    </div>

                    <p
                      class={clsx(
                        'font-semibold transition-all',
                        accumulate() ? 'text-gray-600' : 'text-gray-400'
                      )}
                    >
                      Accumulate
                    </p>
                  </div>
                </label>

                <Show when={accumulate()}>
                  <NewChallengeItemRadio step={accumulateTypeStep}>
                    {accumulateTypes().map((it) => (
                      <NewChallengeItemRadio.Item
                        color={props.color}
                        checked={() => accumulateType() === it}
                        onChange={() => setAccumulateType(it)}
                        name='challenge-item-accumulate-type'
                        id={it.toLowerCase()}
                      >
                        <p class='font-semibold text-sm'>{it}</p>
                      </NewChallengeItemRadio.Item>
                    ))}
                  </NewChallengeItemRadio>
                </Show>
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

                <Switch>
                  <Match when={intervalType() === 'WEEKLY'}>
                    {weeklyPatternSelect()}
                  </Match>

                  <Match when={intervalType() === 'MONTHLY'}>
                    {monthlyPatternSelects()}
                  </Match>

                  <Match when={intervalType() === 'YEARLY'}>
                    {yearlyPatternSelect()}

                    {monthlyPatternSelects()}
                  </Match>
                </Switch>
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

            <Form.Divider />

            <Form.Wrapper>
              <Form.Label>Period</Form.Label>

              <div class='flex items-center justify-between gap-4 relative'>
                <NewChallengeItemDatePicker
                  date={startAt}
                  onChange={setStartAt}
                />
                <MoveRight />
                <NewChallengeItemDatePicker
                  date={endAt}
                  onChange={setEndAt}
                  placeholder='End Date'
                />
              </div>
            </Form.Wrapper>
          </div>

          <Panel.CTAButton
            color={props.color}
            disabled={disabled()}
            onClick={async () => {
              await handleSave();

              close();

              toast.open(`🎉 '${name()}' Challenge Item is added!`);
            }}
          >
            Add
          </Panel.CTAButton>
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
