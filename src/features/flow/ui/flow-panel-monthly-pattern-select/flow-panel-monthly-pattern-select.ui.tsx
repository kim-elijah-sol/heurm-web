import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { flowConstant } from '~/entities/flow';
import { FLOW_TEXT_500 } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type { FlowColor, FlowMonthlyPattern } from '~/shared/types';
import { getWeekWriting } from '../../fx';
import {
  FlowPanelDateSelectSheet,
  FlowPanelWeekSelectSheet,
} from '../flow-panel-pattern-select-sheets';
import { FlowPanelRadio } from '../flow-panel-radio';

type Props = {
  monthlyPattern: Accessor<FlowMonthlyPattern>;
  setMonthlyPattern: Setter<FlowMonthlyPattern>;
  color: Accessor<FlowColor>;
  dates: Accessor<number[]>;
  setDates: Setter<number[]>;
  weeks: Accessor<number[]>;
  setWeeks: Setter<number[]>;
};

export const FlowPanelMonthlyPatternSelect: Component<Props> = (props) => {
  const monthlyPatternStep = () =>
    flowConstant.MONTHLY_PATTERNS.indexOf(props.monthlyPattern());

  const [isDateSelect, openDateSelect, closeDateSelect] = createBoolean();

  const [isWeekSelect, openWeekSelect, closeWeekSelect] = createBoolean();

  return (
    <div>
      <div class='flex items-center gap-2'>
        <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
          Monthly
        </p>

        <FlowPanelRadio step={monthlyPatternStep} class='flex-1'>
          {flowConstant.MONTHLY_PATTERNS.map((it) => (
            <FlowPanelRadio.Item
              color={props.color}
              checked={() => props.monthlyPattern() === it}
              onClick={() => {
                if (it === 'Every Week') props.setMonthlyPattern(it);
                else if (it === 'Select Date') openDateSelect();
                else if (it === 'Select Week') openWeekSelect();
              }}
              name='flow-monthly-pattern'
              id={it.toLowerCase().replace(' ', '-')}
            >
              <p class='font-semibold text-[0.75rem] text-center'>{it}</p>
            </FlowPanelRadio.Item>
          ))}
        </FlowPanelRadio>
        {isDateSelect() && (
          <FlowPanelDateSelectSheet
            close={closeDateSelect}
            color={props.color}
            onSubmit={(dates) => {
              props.setDates(dates);
              props.setMonthlyPattern('Select Date');
            }}
            defaultDates={props.dates}
          />
        )}
        {isWeekSelect() && (
          <FlowPanelWeekSelectSheet
            close={closeWeekSelect}
            color={props.color}
            onSubmit={(weeks) => {
              props.setWeeks(weeks);
              props.setMonthlyPattern('Select Week');
            }}
            defaultWeeks={props.weeks}
          />
        )}
      </div>
      {props.monthlyPattern() === 'Select Date' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm mb-2',
            FLOW_TEXT_500[props.color()]
          )}
        >
          {props
            .dates()
            .map((it) => (it === 32 ? 'Last Date' : it))
            .join(', ')}
        </p>
      )}
      {props.monthlyPattern() === 'Select Week' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm mb-2',
            FLOW_TEXT_500[props.color()]
          )}
        >
          {props.weeks().map(getWeekWriting).join(', ')}
        </p>
      )}
    </div>
  );
};
