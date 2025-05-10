import { clsx } from 'clsx';
import { Accessor, Component } from 'solid-js';

type Props = {
  type: 'win' | 'lose';
  count: Accessor<number>;
};

export const OverviewCard: Component<Props> = (props) => {
  const title = () => (props.type === 'win' ? '🏆 Win!' : '😥 Lose');

  const countText = () => props.count().toLocaleString();

  const countClass = () =>
    clsx(
      'text-4xl font-extrabold',
      props.type === 'win' ? 'text-emerald-500' : 'text-rose-500'
    );

  return (
    <div
      style={{
        flex: props.count() || 1,
        'min-width': '100px',
      }}
      class='flex flex-col items-center rounded-lg p-3 transition-all border bg-white border-slate-100 shadow-[0_0_8px_4px_rgba(70,70,70,0.05)]'
    >
      <span class='text-sm font-semibold mb-3 text-slate-700'>{title()}</span>
      <p class={countClass()}>{countText()}</p>
    </div>
  );
};
