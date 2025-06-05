import { joinQueries } from '~/entities/join';
import { getLoginHelperFormHeight } from '~/features/login-helper/fx';
import { createLoginHelperForm } from '~/features/login-helper/hook';

export const createJoinForm = () => {
  const {
    step,
    setStep,
    email,
    setEmail,
    id,
    setId,
    password,
    setPassword,
    verifyCode,
    setVerifyCode,
    restResendSecond,
    handleResend,
    startCountDown,
  } = createLoginHelperForm();

  const verifyEmailSend = joinQueries.verifyEmailSendMutation(({ id }) => {
    setId(id);
    setStep('verify');
    startCountDown();
  });

  const verifyEmail = joinQueries.verifyEmailMutation(() => {
    setStep('password');
  });

  const formHeight = () => getLoginHelperFormHeight(step());

  const handleSubmit = () => {
    if (step() === 'email') handleSendVerifyEmail();
    else if (step() === 'verify') handleVerify();
    else {
    }
  };

  const handleSendVerifyEmail = () => {
    verifyEmailSend.mutate({ email: email() });
  };

  const handleVerify = () => {
    verifyEmail.mutate({
      email: email(),
      id: id(),
      code: verifyCode(),
    });
  };

  const handleJoin = () => {};

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
