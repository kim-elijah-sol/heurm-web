import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { flowConstant } from '~/entities/flow';
import { FLOW_DAY, FLOW_TEXT_500 } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type { FlowColor, FlowWeeklyPattern } from '~/shared/types';
import { FlowPanelDaySelectSheet } from '../flow-panel-pattern-select-sheets';
import { FlowPanelRadio } from '../flow-panel-radio';

type Props = {
  weeklyPattern: Accessor<FlowWeeklyPattern>;
  setWeeklyPattern: Setter<FlowWeeklyPattern>;
  color: Accessor<FlowColor>;
  days: Accessor<number[]>;
  setDays: Setter<number[]>;
};

export const FlowPanelWeeklyPatternSelect: Component<Props> = (props) => {
  const weeklyPatternStep = () =>
    flowConstant.WEEKLY_PATTERNS.indexOf(props.weeklyPattern());

  const [isDaySelect, openDaySelect, closeDaySelect] = createBoolean();

  return (
    <div>
      <div class='flex items-center gap-2'>
        <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
          Weekly
        </p>

        <FlowPanelRadio step={weeklyPatternStep} class='flex-1'>
          {flowConstant.WEEKLY_PATTERNS.map((it) => (
            <FlowPanelRadio.Item
              color={props.color}
              checked={() => props.weeklyPattern() === it}
              onClick={() => {
                if (it === 'Every Day') props.setWeeklyPattern(it);
                else openDaySelect();
              }}
              name='flow-weekly-pattern'
              id={it.toLowerCase().replace(' ', '-')}
            >
              <p class='font-semibold text-[0.75rem] text-center'>{it}</p>
            </FlowPanelRadio.Item>
          ))}
        </FlowPanelRadio>

        {isDaySelect() && (
          <FlowPanelDaySelectSheet
            close={closeDaySelect}
            color={props.color}
            onSubmit={(days) => {
              props.setDays(days);
              props.setWeeklyPattern('Select Day');
            }}
            defaultDays={props.days}
          />
        )}
      </div>

      {props.weeklyPattern() === 'Select Day' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm mb-2',
            FLOW_TEXT_500[props.color()]
          )}
        >
          {props
            .days()
            .map((it) => FLOW_DAY[it])
            .join(', ')}
        </p>
      )}
    </div>
  );
};
