import clsx from 'clsx';
import { children, type Accessor, type Component, type JSX } from 'solid-js';

type Props = {
  children: JSX.Element;
  step: Accessor<number>;
  class?: string;
};

export const FlowPanelRadio: Component<Props> = (props) => {
  const count = () =>
    Array.isArray(props.children) ? props.children.length : 1;

  const paddingXSide = 6;

  const paddingX = paddingXSide * 2;

  const gap = 8;

  const gapTotal = () => (count() - 1) * gap;

  const spacing = () => paddingX + gapTotal();

  return (
    <div
      class={clsx(
        'flex relative w-full h-14 bg-slate-100 rounded-[24px] p-[6px] gap-2',
        props.class
      )}
    >
      {children(() => props.children)()}
      <div
        class='absolute top-[6px] bottom-[6px] bg-slate-200 transition-all duration-300 rounded-[18px]'
        style={{
          width: `calc(calc(100% - ${spacing()}px) / ${count()})`,
          left: `calc(calc(calc(calc(100% - ${spacing()}px) / ${count()}) * ${props.step()}) + ${
            props.step() * gap + paddingXSide
          }px)`,
        }}
      ></div>
    </div>
  );
};
