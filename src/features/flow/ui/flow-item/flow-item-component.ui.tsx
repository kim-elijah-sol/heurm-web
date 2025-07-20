import clsx from 'clsx';
import { children, type Component, type JSX } from 'solid-js';
import { FLOW_INSET_RING_500 } from '~/shared/constant';
import { useFlowItemColor } from '../../hook';

type WrapperProps = {
  onClick: () => void;
  children: JSX.Element;
};

const Wrapper: Component<WrapperProps> = (props) => {
  const color = useFlowItemColor();

  return (
    <div
      onClick={props.onClick}
      class={clsx(
        'px-4 py-3 rounded-[24px] transition-all active:scale-95 relative overflow-hidden bg-white inset-ring-2',
        FLOW_INSET_RING_500[color()]
      )}
    >
      {children(() => props.children)()}
    </div>
  );
};

export const FlowItemComponent = {
  Wrapper,
};
