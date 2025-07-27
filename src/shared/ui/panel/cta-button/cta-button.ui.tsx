import clsx from 'clsx';
import { splitProps, type Accessor, type Component, type JSX } from 'solid-js';
import {
  FLOW_ACTIVE_BG_500,
  FLOW_BG_400,
  FLOW_FROM_300,
} from '~/shared/constant';
import type { FlowColor } from '~/shared/types';

type Props = Omit<JSX.IntrinsicElements['button'], 'color'> & {
  color: Accessor<FlowColor>;
};

export const CTAButton: Component<Props> = (props) => {
  const [local, rest] = splitProps(props, ['color', 'disabled']);

  const disabled = () => !!local.disabled;

  return (
    <div class='absolute bottom-0 left-0 right-0 p-4 pt-8 bg-linear-to-t from-white via-white via-60% to-white/0 z-10'>
      <button
        disabled={disabled()}
        class={clsx(
          'w-full text-white font-semibold py-3.5 text-lg rounded-[24px] transition-all active:scale-95 disabled:active:scale-100 disabled:bg-gray-300 disabled:active:bg-gray-300',
          FLOW_BG_400[local.color()],
          FLOW_ACTIVE_BG_500[local.color()]
        )}
        {...rest}
      />

      <div
        class={clsx(
          'absolute left-0 bottom-0 right-0 h-[32px] bg-linear-to-t blur-md to-white rounded-[50%] translate-y-[24px]',
          disabled() ? 'from-white' : FLOW_FROM_300[local.color()]
        )}
      />
    </div>
  );
};
