import { createSignal } from 'solid-js';
import { NewChallengeItemStepType } from '~/entities/new-challenge-item/model';
import { createChallengeItemDay } from '~/features/new-challenge-item/hook';
import { ChallengeItemType } from '~/shared/model';
import { BluredPanel, X } from '~/shared/ui';
import { NewChallengeItemStep } from '../new-challenge-item-step';
import './new-challenge-item-step.ui.css';

type Props = {
  onSubmit: (challengeItem: ChallengeItemType) => void;
  close: () => void;
};

export const NewChallengeItemPanel = (props: Props) => {
  const [step, setStep] = createSignal<NewChallengeItemStepType>('type');

  const [type, setType] = createSignal<'complete' | 'over' | 'under' | null>(
    null
  );

  const [name, setName] = createSignal<string>('');

  const [count, setCount] = createSignal<string>('');

  const [day, handleChangeDay] = createChallengeItemDay();

  return (
    <BluredPanel close={props.close} autoClose={false}>
      {(close) => (
        <div class='w-full h-full relative'>
          <button
            onClick={close}
            class='p-2 rounded-[35%] transition-all active:scale-90 bg-red-400 absolute right-6 top-6 active:bg-red-500'
          >
            <X />
          </button>

          <NewChallengeItemStep.Type
            displayType={step() === 'type' ? 'current' : 'end'}
            onNext={(type) => {
              setType(type);
              setStep('name');
            }}
          />

          <NewChallengeItemStep.Name
            name={name()}
            setName={setName}
            displayType={
              step() === 'name'
                ? 'current'
                : step() === 'type'
                ? 'ready'
                : 'end'
            }
            onPrev={() => setStep('type')}
            onNext={() => {
              if (type() === 'complete') {
                setStep('day');
              } else {
                setStep('count');
              }
            }}
          />

          <NewChallengeItemStep.Count
            count={count()}
            setCount={setCount}
            displayType={
              step() === 'count'
                ? 'current'
                : step() === 'day'
                ? 'end'
                : 'ready'
            }
            onPrev={() => setStep('name')}
            onNext={() => setStep('day')}
          />

          <NewChallengeItemStep.Day
            displayType={step() === 'day' ? 'current' : 'ready'}
            day={day()}
            onChangeDay={handleChangeDay}
            onPrev={() => {
              if (type() === 'complete') {
                setStep('name');
              } else {
                setStep('count');
              }
            }}
            onNext={() => {
              const _type = type();

              if (_type === null) return;

              if (_type === 'complete') {
                props.onSubmit({
                  type: 'complete',
                  isCompleted: null,
                  name: name(),
                  day: day(),
                });
              } else {
                props.onSubmit({
                  type: _type,
                  targetCount: Number(count()),
                  count: null,
                  name: name(),
                  day: day(),
                });
              }
              close();
            }}
          />
        </div>
      )}
    </BluredPanel>
  );
};
