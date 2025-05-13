import { createLoginHelperForm } from '~/shared/hook';
import { getJoinFormHeight } from '../fx';

export const createJoinForm = () => {
  const {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
    verifyCode,
    setVerifyCode,
    restResendSecond,
    handleResend,
    startCountDown,
  } = createLoginHelperForm();

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
