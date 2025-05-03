import clsx from 'clsx';
import { Accessor, createEffect, createSignal, Setter } from 'solid-js';
import { Check, X } from '~/shared/ui';
import './challenge-slide-panel-top.ui.css';

type Props = {
  close: () => void;
  title: Accessor<string>;
  setTitle: Setter<string>;
};

export const ChallengeSlidePanelTop = (props: Props) => {
  const [titleValue, setTitleValue] = createSignal(props.title());

  const [titleWidth, setTitleWidth] = createSignal(0);

  const [isFocused, setIsFocused] = createSignal(false);

  createEffect(() => {
    props.title();
    setTitleWidth(
      document.querySelector('#title-width-tracker')?.clientWidth ?? 0
    );
  });

  return (
    <div class='flex items-center justify-between mb-4 gap-4'>
      <input
        id='title-input'
        type='text'
        class='font-semibold text-xl py-2 px-3 rounded-[12px] bg-slate-100 transition-all wys-challenge-slide-panel-top-input'
        value={titleValue()}
        onInput={(e) => setTitleValue(e.target.value)}
        onBlur={() => {
          const nextTitle = titleValue().trim();

          if (nextTitle) {
            props.setTitle(nextTitle);
          } else {
            setTitleValue(props.title());
          }
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        maxLength={16}
        style={{
          width: `${titleWidth()}px`,
        }}
      />
      <button
        onClick={() => {
          if (isFocused() === false) {
            props.close();
          }
        }}
        class={clsx(
          'p-[10px] rounded-[35%] transition-all active:scale-[.95]',
          isFocused()
            ? 'bg-green-400 active:bg-green-500'
            : 'bg-red-400 active:bg-red-500'
        )}
      >
        {isFocused() ? <Check size={24} /> : <X size={24} />}
      </button>
      <p
        class='font-semibold text-xl py-2 px-3 rounded-[12px] bg-slate-100 transition-all w-fit fixed left-[-3141592px] top-[-3141592px]'
        id='title-width-tracker'
      >
        {props.title()}
      </p>
    </div>
  );
};
