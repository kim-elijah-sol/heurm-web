import { createSignal, onCleanup } from 'solid-js';
import { MOTIVATION_WRITING } from '~/entities/main';

export const MotivationCard = () => {
  const [index, setIndex] = createSignal(0);

  const timer = setInterval(() => {
    let nextIndex = index() + 1;

    if (nextIndex >= MOTIVATION_WRITING.length) nextIndex = 0;

    setIndex(nextIndex);
  }, 3000);

  onCleanup(() => clearInterval(timer));

  return (
    <div class='flex items-center justify-center flex-1 h-[98px] border rounded-lg p-3 bg-white border-slate-100 shadow-[0_0_8px_4px_rgba(70,70,70,0.05)]'>
      <p
        class='font-bold text-center text-slate-800'
        innerHTML={`"${MOTIVATION_WRITING[index()]}"`}
      />
    </div>
  );
};
