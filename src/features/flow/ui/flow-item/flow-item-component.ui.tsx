import clsx from 'clsx';
import { Accessor, type Component, type JSX } from 'solid-js';
import {
  FLOW_BG_500,
  FLOW_BG_500_10,
  FLOW_INSET_RING_500,
  FLOW_TEXT_500,
} from '~/shared/constant';
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
        'px-4 py-3 rounded-[28px] transition-all active:scale-95 relative overflow-hidden bg-white'
      )}
    >
      {props.children}

      <div
        class={clsx(
          'absolute inset-0 inset-ring-2 rounded-[28px] z-2',
          FLOW_INSET_RING_500[color()]
        )}
      />
    </div>
  );
};

type StatusBgProps = {
  isFill: Accessor<boolean | null>;
  isPale?: Accessor<boolean | null>;
};

const StatusBg: Component<StatusBgProps> = (props) => {
  const color = useFlowItemColor();

  return (
    <div
      class={clsx(
        'inset-0 absolute transition-all duration-500 z-1',
        props.isPale?.() ? FLOW_BG_500_10[color()] : FLOW_BG_500[color()],
        props.isFill() === true ? 'right-0' : 'right-full'
      )}
    />
  );
};

type ContentProsp = {
  children: JSX.Element;
};

const Content: Component<ContentProsp> = (props) => {
  return <div class='relative z-3'>{props.children}</div>;
};

type MainProps = {
  children: JSX.Element;
};

const Main: Component<MainProps> = (props) => {
  return <div class='flex justify-between items-center'>{props.children}</div>;
};

type NameProps = {
  isWhite: boolean | null;
  children: JSX.Element;
};

const Name: Component<NameProps> = (props) => {
  const color = useFlowItemColor();

  return (
    <p
      class={clsx(
        'font-semibold text-lg transition-all duration-500',
        props.isWhite ? 'text-white' : FLOW_TEXT_500[color()]
      )}
    >
      {props.children}
    </p>
  );
};

export const FlowItemComponent = {
  Wrapper,
  StatusBg,
  Content,
  Main,
  Name,
};
