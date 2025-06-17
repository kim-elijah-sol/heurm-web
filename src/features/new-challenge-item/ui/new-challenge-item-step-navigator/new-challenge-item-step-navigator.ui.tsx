import { type Accessor, type Component } from 'solid-js';

type Props = {
  maxStep: Accessor<number>;
  currentStep: Accessor<number>;
};

export const NewChallengeItemStepNavigator: Component<Props> = (props) => {
  return (
    <div class='absolute top-0 left-0 right-0 flex gap-2 px-2 pt-2'>
      {Array.from({ length: props.maxStep() }).map((_, index) => {
        const step = () => index + 1;

        return (
          <div class='flex-1 h-1 z-2  rounded-[2px] overflow-hidden bg-white/40'>
            <div
              class='h-full bg-white transition-all'
              style={{
                width: `${step() <= props.currentStep() ? 100 : 0}%`,
              }}
            />
          </div>
        );
      })}
      <div class='absolute top-0 left-0 right-0 h-12 bg-linear-to-b from-black/20 to-black/0'></div>
    </div>
  );
};
