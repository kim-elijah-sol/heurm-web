import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { flowConstant } from '~/entities/flow';
import { FLOW_MONTH, FLOW_TEXT_500 } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type { FlowColor, FlowYearlyPattern } from '~/shared/types';
import { FlowPanelMonthSelectSheet } from '../flow-panel-pattern-select-sheets';
import { FlowPanelRadio } from '../flow-panel-radio';

type Props = {
  yearlyPattern: Accessor<FlowYearlyPattern>;
  setYearlyPattern: Setter<FlowYearlyPattern>;
  color: Accessor<FlowColor>;
  months: Accessor<number[]>;
  setMonths: Setter<number[]>;
};

export const FlowPanelYearlyPatternSelect: Component<Props> = (props) => {
  const yearlyPatternStep = () =>
    flowConstant.YEARLY_PATTERNS.indexOf(props.yearlyPattern());

  const [isMonthSelect, openIsMonthSelect, closeMonthSelect] = createBoolean();

  return (
    <div>
      <div class='flex items-center gap-2'>
        <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
          Yearly
        </p>

        <FlowPanelRadio step={yearlyPatternStep} class='flex-1'>
          {flowConstant.YEARLY_PATTERNS.map((it) => (
            <FlowPanelRadio.Item
              color={props.color}
              checked={() => props.yearlyPattern() === it}
              onClick={() => {
                if (it === 'Every Month') props.setYearlyPattern(it);
                else openIsMonthSelect();
              }}
              name='flow-yearly-pattern'
              id={it.toLowerCase().replace(' ', '-')}
            >
              <p class='font-semibold text-[0.75rem] text-center'>{it}</p>
            </FlowPanelRadio.Item>
          ))}
        </FlowPanelRadio>

        {isMonthSelect() && (
          <FlowPanelMonthSelectSheet
            close={closeMonthSelect}
            color={props.color}
            onSubmit={(months) => {
              props.setMonths(months);
              props.setYearlyPattern('Select Month');
            }}
            defaultMonths={props.months}
          />
        )}
      </div>

      {props.yearlyPattern() === 'Select Month' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm mb-2',
            FLOW_TEXT_500[props.color()]
          )}
        >
          {props
            .months()
            .map((it) => FLOW_MONTH[it])
            .join(', ')}
        </p>
      )}
    </div>
  );
};
