import { getJoinFormHeight } from '~/features/join/fx';
import { createLoginHelperForm } from '~/shared/hook';

export const createResetPasswordForm = () => {
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

  const resetPasswordFormHeight = () => getJoinFormHeight(step());

  const handleSubmit = () => {
    if (step() === 'email') {
      setStep('verify');
      startCountDown();
    } else if (step() === 'verify') {
      setStep('password');
    } else {
      setStep('done');
    }
  };

  return {
    step,
    email,
    setEmail,
    handleSubmit,
    password,
    setPassword,
    verifyCode,
    setVerifyCode,
    restResendSecond,
    handleResend,
    resetPasswordFormHeight,
  };
};
