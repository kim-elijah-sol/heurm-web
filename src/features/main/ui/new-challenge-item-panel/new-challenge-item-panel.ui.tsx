import { createSignal } from 'solid-js';
import { NewChallengeStep } from '~/entities/main';
import { X } from '~/shared/ui';
import { createChallengeItemDay } from '../../hook';
import { NewChallengeItemStep } from '../new-challenge-item-step';

type Props = {
  close: () => void;
};

export const NewChallengeItemPanel = (props: Props) => {
  const [step, setStep] = createSignal<NewChallengeStep>('type');

  const [day, handleChangeDay] = createChallengeItemDay();

  return (
    <div class='w-full h-full relative'>
      <button
        onClick={props.close}
        class='p-2 rounded-[35%] transition-all active:scale-90 bg-red-400 absolute right-6 top-6 active:bg-red-500'
      >
        <X />
      </button>

      <NewChallengeItemStep.Type
        displayType={step() === 'type' ? 'current' : 'end'}
        onNext={() => setStep('name')}
      />

      <NewChallengeItemStep.Name
        displayType={
          step() === 'name' ? 'current' : step() === 'type' ? 'ready' : 'end'
        }
        onPrev={() => setStep('type')}
        onNext={() => setStep('count')}
      />

      <NewChallengeItemStep.Count
        displayType={
          step() === 'count' ? 'current' : step() === 'day' ? 'end' : 'ready'
        }
        onPrev={() => setStep('name')}
        onNext={() => setStep('day')}
      />

      <NewChallengeItemStep.Day
        displayType={step() === 'day' ? 'current' : 'ready'}
        day={day()}
        onChangeDay={handleChangeDay}
        onPrev={() => setStep('count')}
        onNext={props.close}
      />
    </div>
  );
};
