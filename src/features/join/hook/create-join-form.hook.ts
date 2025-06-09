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
    startCountDown,
  } = createLoginHelperForm();

  const verifyEmailSend = joinQueries.postVerifyEmailSendMutation(({ id }) => {
    setId(id);
    setStep('verify');
    startCountDown();
  });

  const verifyEmail = joinQueries.postVerifyEmailMutation(() => {
    setStep('password');
  });

  const join = joinQueries.postJoinMutation(() => {
    setStep('done');
  });

  const formHeight = () => getLoginHelperFormHeight(step());

  const handleSubmit = () => {
    if (step() === 'email') handleSendVerifyEmail();
    else if (step() === 'verify') handleVerify();
    else handleJoin();
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

  const handleJoin = () => {
    join.mutate({
      email: email(),
      id: id(),
      password: password(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
    });
  };

  const handleResend = () => {
    if (restResendSecond() === 0) {
      handleSendVerifyEmail();
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
