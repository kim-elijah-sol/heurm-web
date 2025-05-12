import { createSignal, onCleanup } from 'solid-js';
import { JoinStep, JoinStepDisplayType } from '~/entities/join/model';
import { getJoinFormHeight, getJoinStepValue } from '../fx';

export const createJoinForm = () => {
  const RESEND_TIMEOUT = 60;

  const [step, setStep] = createSignal<JoinStep>('email');

  const [email, setEmail] = createSignal<string>('');

  const [password, setPassword] = createSignal<string>('');

  const [verifyCode, setVerifyCode] = createSignal<string>('');

  const [restResendSecond, setRestResendSecond] =
    createSignal<number>(RESEND_TIMEOUT);

  const [timerId, setTimerId] = createSignal<number | null>(null);

  const startCountDown = () => {
    setRestResendSecond(RESEND_TIMEOUT);

    const id = setInterval(() => {
      setRestResendSecond((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(id);
  };

  onCleanup(() => {
    if (timerId()) clearInterval(timerId()!);
  });

  const handleResend = () => {
    startCountDown();
  };

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
      startCountDown();
    } else {
      setStep('done');
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
    verifyCode,
    setVerifyCode,
    restResendSecond,
    handleResend,
  };
};
