import clsx from 'clsx';
import { createSignal, onCleanup, Show } from 'solid-js';
import { MOTIVATION_WRITING } from '~/entities/main/constant';
import './motivation-card.ui.css';

export const MotivationCard = () => {
  const [index, setIndex] = createSignal(0);

  const [transition, setTransition] = createSignal(false);

  let timer: ReturnType<typeof setInterval>;

  const nextIndex = () => {
    let next = index() + 1;
    if (next >= MOTIVATION_WRITING.length) next = 0;
    return next;
  };

  const cycle = () => {
    setTransition(true);
    setTimeout(() => {
      setIndex(nextIndex());
      setTransition(false);
    }, 700);
  };

  timer = setInterval(cycle, 4000);

  onCleanup(() => clearInterval(timer));

  const textBoxClassName = 'w-full h-full flex items-center justify-center';

  const textClassName = 'font-bold text-center text-emerald-800 text-sm';

  return (
    <div class='relative flex-1 h-[98px] border rounded-lg p-3 bg-emerald-50 border-emerald-200 shadow-[0_0_8px_4px_rgba(70,70,70,0.05)] overflow-hidden'>
      <div
        class={clsx(
          textBoxClassName,
          transition() ? 'wys-motivation-fade-out' : ''
        )}
      >
        <p
          class={textClassName}
          innerHTML={`"${MOTIVATION_WRITING[index()]}"`}
        />
      </div>
      <Show when={transition()}>
        <div class={clsx(textBoxClassName, 'wys-motivation-fade-in')}>
          <p
            class={textClassName}
            innerHTML={`"${MOTIVATION_WRITING[nextIndex()]}"`}
          />
        </div>
      </Show>
    </div>
  );
};
