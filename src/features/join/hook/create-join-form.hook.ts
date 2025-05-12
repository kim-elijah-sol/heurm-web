import { createSignal } from 'solid-js';
import { JoinStep, JoinStepDisplayType } from '~/entities/join/model';
import { getJoinFormHeight, getJoinStepValue } from '../fx';

export const createJoinForm = () => {
  const [step, setStep] = createSignal<JoinStep>('email');

  const [email, setEmail] = createSignal<string>('');

  const [password, setPassword] = createSignal<string>('');

  const getDisplayType = (_step: JoinStep) => (): JoinStepDisplayType => {
    const currentStepValue = getJoinStepValue(step());
    const targetStepValue = getJoinStepValue(_step);

    return currentStepValue === targetStepValue
      ? 'current'
      : currentStepValue > targetStepValue
      ? 'end'
      : 'ready';
  };

  const joinFormHeight = () => getJoinFormHeight(step());

  const handleSubmit = () => {
    if (step() === 'email') {
      setStep('password');
    } else if (step() === 'password') {
      setStep('verify');
    }
  };

  return {
    step,
    email,
    setEmail,
    getDisplayType,
    joinFormHeight,
    handleSubmit,
    password,
    setPassword,
  };
};
