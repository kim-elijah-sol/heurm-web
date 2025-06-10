import { type Component } from 'solid-js';
import { ChallengeEditType } from '~/entities/challenge-edit';
import { createNewChallengeItemForm } from '~/features/new-challenge-item/hook';
import { NewChallengeItemStep } from '~/features/new-challenge-item/ui';
import { toast } from '~/shared/lib';
import { Panel } from '~/shared/ui';
import './new-challenge-item-step.ui.css';

type Props = {
  onSubmit: (challengeItem: ChallengeEditType.ChallengeItemForm) => void;
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
              if (type() === 'COMPLETE') {
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
              if (type() === 'COMPLETE') {
                setStep('name');
              } else {
                setStep('count');
              }
            }}
            onNext={() => {
              const _type = type();

              if (_type === null) return;

              toast.open(`🎉 '${name()}' is added!`);

              const id = new Date().valueOf().toString();

              if (_type === 'COMPLETE') {
                props.onSubmit({
                  id,
                  type: 'COMPLETE',
                  name: name(),
                  days: day(),
                  isNew: true,
                });
              } else {
                props.onSubmit({
                  id,
                  type: _type,
                  targetCount: Number(count()),
                  name: name(),
                  days: day(),
                  isNew: true,
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
