import { Component } from 'solid-js';
import { createNewChallengeItemForm } from '~/features/new-challenge-item/hook';
import { NewChallengeItemStep } from '~/features/new-challenge-item/ui';
import { ChallengeItem } from '~/shared/model';
import { Panel } from '~/shared/ui';
import './new-challenge-item-step.ui.css';

type Props = {
  onSubmit: (challengeItem: ChallengeItem) => void;
  close: () => void;
};

export const NewChallengeItemPanel: Component<Props> = (props) => {
  const {
    setStep,
    type,
    setType,
    name,
    setName,
    count,
    setCount,
    day,
    handleChangeDay,
    getDisplayType,
  } = createNewChallengeItemForm();

  return (
    <Panel.Blured close={props.close} autoClose={false}>
      {(close) => (
        <div class='w-full h-full relative'>
          <Panel.CloseButton onClick={close} />

          <NewChallengeItemStep.Type
            displayType={getDisplayType('type')}
            onNext={(type) => {
              setType(type);
              setStep('name');
            }}
          />

          <NewChallengeItemStep.Name
            name={name}
            setName={setName}
            displayType={getDisplayType('name')}
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
            count={count}
            setCount={setCount}
            displayType={getDisplayType('count')}
            onPrev={() => setStep('name')}
            onNext={() => setStep('day')}
          />

          <NewChallengeItemStep.Day
            displayType={getDisplayType('day')}
            day={day}
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
    </Panel.Blured>
  );
};
