import { clsx } from 'clsx';
import { Component, createMemo } from 'solid-js';

type Props = {
  type: 'win' | 'lose';
  count: number;
};

export const OverviewCard: Component<Props> = (props) => {
  const { type, count } = props;

  const title = () => (type === 'win' ? '🏆 Win!' : '😥 Lose');

  const countText = () => count.toLocaleString();

  const countClass = createMemo(() =>
    clsx(
      'text-4xl font-extrabold',
      type === 'win' ? 'text-emerald-500' : 'text-rose-500'
    )
  );

  return (
    <div class='flex flex-1 flex-col items-center rounded-lg p-3 border border-slate-100 shadow-[0_0_15px_4px_rgba(70,70,70,0.1)]'>
      <span class='text-sm font-semibold mb-3 text-slate-700'>{title()}</span>
      <p class={countClass()}>{countText()}</p>
    </div>
  );
};
