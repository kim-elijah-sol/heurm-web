import { getLoginHelperFormHeight } from '~/features/login-helper/fx';
import { createLoginHelperForm } from '~/features/login-helper/hook';

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

  const formHeight = () => getLoginHelperFormHeight(step());

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
    formHeight,
    handleSubmit,
    password,
    setPassword,
    verifyCode,
    setVerifyCode,
    restResendSecond,
    handleResend,
  };
};
