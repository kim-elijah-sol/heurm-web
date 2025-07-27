import { useQueryClient } from '@tanstack/solid-query';
import clsx from 'clsx';
import {
  createSignal,
  Match,
  Show,
  Switch,
  type Accessor,
  type Component,
} from 'solid-js';
import { flowConstant, flowQueries, type FlowType } from '~/entities/flow';
import { flowWaveQueries } from '~/entities/flow-wave';
import { historyQueries } from '~/entities/history';
import { waveQueries } from '~/entities/wave';
import { createEditFlowForm } from '~/features/flow/hook';
import {
  FlowPanelDatePicker,
  FlowPanelForm,
  FlowPanelMonthlyPatternSelect,
  FlowPanelRadio,
  FlowPanelWeeklyPatternSelect,
  FlowPanelYearlyPatternSelect,
} from '~/features/flow/ui';
import { NewWaveButton, WaveItem, WaveList } from '~/features/wave/ui';
import { FLOW_BG_400, FLOW_BORDER_400, FLOW_TEXT_500 } from '~/shared/constant';
import { toast } from '~/shared/lib';
import { Nullable } from '~/shared/types';
import {
  Check,
  CheckCheck,
  ChevronsDown,
  ChevronsUp,
  FlowColorSelect,
  MoveRight,
  Panel,
  X,
} from '~/shared/ui';

type Props = {
  close: () => void;
  flow: Accessor<FlowType.GetFlowResponseItem>;
};

export const EditFlowPanel: Component<Props> = (props) => {
  const inputBaseClassName =
    'font-semibold px-4 py-4 rounded-[24px] w-full transition-all bg-slate-100 focus:bg-slate-200 placeholder:text-gray-400';

  const queryClient = useQueryClient();

  const {
    name,
    handleInputName,
    nameTitle,
    color,
    setColor,
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
  } = createEditFlowForm(props.flow);

  const yearlyPatternSelect = () => (
    <FlowPanelYearlyPatternSelect
      yearlyPattern={yearlyPattern}
      setYearlyPattern={setYearlyPattern}
      color={color}
      months={months}
      setMonths={setMonths}
    />
  );

  const monthlyPatternSelect = () => (
    <FlowPanelMonthlyPatternSelect
      monthlyPattern={monthlyPattern}
      setMonthlyPattern={setMonthlyPattern}
      color={color}
      dates={dates}
      setDates={setDates}
      weeks={weeks}
      setWeeks={setWeeks}
    />
  );

  const weeklyPatternSelect = () => (
    <FlowPanelWeeklyPatternSelect
      weeklyPattern={weeklyPattern}
      setWeeklyPattern={setWeeklyPattern}
      days={days}
      setDays={setDays}
      color={color}
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

  const wave = waveQueries.getWaveQuery();

  const defaultSelectedWaveId = props.flow().wave.length
    ? props.flow().wave[0].id
    : null;

  const [selectedWave, setSelectedWave] = createSignal<Nullable<string>>(
    defaultSelectedWaveId
  );

  const handleClickWaveItem = (id: string) => {
    setSelectedWave(selectedWave() === id ? null : id);
  };

  const postFlowWave = flowWaveQueries.postFlowWaveMutation();

  const deleteFlowWave = flowWaveQueries.deleteFlowWaveMutation();

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
            <FlowColorSelect
              color={color}
              setColor={setColor}
              className='mb-6'
            />
            <FlowPanelForm.Wrapper>
              <FlowPanelForm.Label>Name</FlowPanelForm.Label>
              <input
                type='text'
                class={inputBaseClassName}
                value={name()}
                onInput={handleInputName}
                placeholder='Flow Name'
              />
            </FlowPanelForm.Wrapper>
            <FlowPanelForm.Wrapper>
              <FlowPanelForm.Label>Type</FlowPanelForm.Label>
              <FlowPanelRadio step={typeStep}>
                <FlowPanelRadio.Item
                  color={color}
                  checked={() => type() === 'COMPLETE'}
                  onChange={() => setType('COMPLETE')}
                  name='flow-type'
                  id='complete'
                >
                  <CheckCheck
                    size={24}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </FlowPanelRadio.Item>
                <FlowPanelRadio.Item
                  color={color}
                  checked={() => type() === 'OVER'}
                  onChange={() => setType('OVER')}
                  name='flow-type'
                  id='over'
                >
                  <ChevronsUp
                    size={24}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </FlowPanelRadio.Item>
                <FlowPanelRadio.Item
                  color={color}
                  checked={() => type() === 'UNDER'}
                  onChange={() => setType('UNDER')}
                  name='flow-type'
                  id='under'
                >
                  <ChevronsDown
                    size={24}
                    stroke='currentColor'
                    className='transition-all'
                  />
                </FlowPanelRadio.Item>
              </FlowPanelRadio>
            </FlowPanelForm.Wrapper>

            <Show when={type() !== 'COMPLETE'}>
              <FlowPanelForm.Wrapper>
                <FlowPanelForm.Label>
                  Target Count &nbsp;&&nbsp; Unit
                </FlowPanelForm.Label>
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
                              FLOW_BG_400[color()],
                              FLOW_BORDER_400[color()],
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
                  <FlowPanelRadio step={accumulateTypeStep}>
                    {flowConstant.INTERVAL_TYPES.map((it) => (
                      <FlowPanelRadio.Item
                        color={color}
                        checked={() => accumulateType() === it}
                        onChange={() => setAccumulateType(it)}
                        name='flow-accumulate-type'
                        id={it.toLowerCase()}
                      >
                        <p class='font-semibold text-sm'>{it}</p>
                      </FlowPanelRadio.Item>
                    ))}
                  </FlowPanelRadio>
                </Show>
              </FlowPanelForm.Wrapper>
            </Show>

            <FlowPanelForm.Divider />

            <FlowPanelForm.Wrapper>
              <FlowPanelForm.Label>Interval Type</FlowPanelForm.Label>
              <FlowPanelRadio step={intervalTypeStep}>
                {flowConstant.INTERVAL_TYPES.map((it) => (
                  <FlowPanelRadio.Item
                    color={color}
                    checked={() => intervalType() === it}
                    onChange={() => setIntervalType(it)}
                    name='flow-interval-type'
                    id={it.toLowerCase()}
                  >
                    <p class='font-semibold text-sm'>{it}</p>
                  </FlowPanelRadio.Item>
                ))}
              </FlowPanelRadio>
            </FlowPanelForm.Wrapper>

            <Show when={intervalType() !== 'DAILY'}>
              <FlowPanelForm.Wrapper>
                <FlowPanelForm.Label>Interval Pattern</FlowPanelForm.Label>

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
              </FlowPanelForm.Wrapper>

              <FlowPanelForm.Divider />
            </Show>

            <FlowPanelForm.Wrapper>
              <FlowPanelForm.Label>Repeat Type</FlowPanelForm.Label>
              <FlowPanelRadio step={repeatTypeStep}>
                {flowConstant.REPEAT_TYPES.map((it) => (
                  <FlowPanelRadio.Item
                    color={color}
                    checked={() => repeatType() === it}
                    onChange={() => setRepeatType(it)}
                    name='flow-repeat-type'
                    id={it.toLowerCase()}
                  >
                    <p class='font-semibold text-sm'>
                      {getRepeatRadioText(it)}
                    </p>
                  </FlowPanelRadio.Item>
                ))}
              </FlowPanelRadio>

              {repeatType() !== 'EVERY' && (
                <div class='flex w-full gap-2 items-center justify-between'>
                  <p
                    class={clsx(
                      'text-sm font-semibold whitespace-nowrap pl-4 flex-1',
                      FLOW_TEXT_500[color()]
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
            </FlowPanelForm.Wrapper>

            <FlowPanelForm.Divider />

            <FlowPanelForm.Wrapper>
              <div>
                <FlowPanelForm.Label>Wave</FlowPanelForm.Label>
                <FlowPanelForm.Description>
                  Select a Wave to organize your Flow.
                </FlowPanelForm.Description>
              </div>

              <WaveList>
                {wave.data?.map((wave) => (
                  <WaveItem
                    color={color}
                    selected={() => selectedWave() === wave.id}
                    onClick={() => handleClickWaveItem(wave.id)}
                  >
                    {wave.name}
                  </WaveItem>
                ))}

                <NewWaveButton color={color} />
              </WaveList>
            </FlowPanelForm.Wrapper>

            <FlowPanelForm.Divider />

            <FlowPanelForm.Wrapper>
              <FlowPanelForm.Label>Period</FlowPanelForm.Label>

              <div class='flex items-center justify-between gap-4 relative'>
                <FlowPanelDatePicker date={startAt} onChange={setStartAt} />
                <MoveRight />
                <FlowPanelDatePicker
                  date={endAt}
                  onChange={setEndAt}
                  placeholder='End Date'
                  removable
                />
              </div>
            </FlowPanelForm.Wrapper>
          </div>

          <Panel.CTAButton
            color={color}
            disabled={disabled()}
            onClick={async () => {
              const isTypeChanged = type() !== props.flow().type;

              await handleSave();

              if (selectedWave() !== defaultSelectedWaveId) {
                const flowId = props.flow().id;

                if (defaultSelectedWaveId !== null) {
                  await deleteFlowWave.mutateAsync({
                    flowId,
                    waveId: defaultSelectedWaveId,
                  });
                }

                if (selectedWave()) {
                  await postFlowWave.mutateAsync({
                    flowId,
                    waveId: selectedWave()!,
                  });
                }
              }

              queryClient.invalidateQueries({
                queryKey: flowQueries.keys.get.queryKey,
              });

              if (isTypeChanged) {
                queryClient.invalidateQueries({
                  queryKey: historyQueries.keys.get(props.flow().id).queryKey,
                });
              }

              close();

              toast.open(`🎉 '${name()}' Flow is edited!`);
            }}
          >
            Save
          </Panel.CTAButton>
        </>
      )}
    </Panel.Slide>
  );
};
