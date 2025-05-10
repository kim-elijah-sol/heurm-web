import type { Accessor, Component } from 'solid-js';

type Props = {
  count: Accessor<number>;
};

export const InProgressCard: Component<Props> = (props) => {
  const countText = () => props.count().toLocaleString();

  return (
    <div class='flex flex-col items-center w-fit border rounded-lg p-3 bg-white border-slate-100 shadow-[0_0_8px_4px_rgba(70,70,70,0.05)]'>
      <span class='text-sm font-semibold mb-3 text-slate-700'>
        🚀 In progress
      </span>
      <p class='text-4xl font-extrabold text-blue-500'>{countText()}</p>
    </div>
  );
};
