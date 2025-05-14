import { createSignal, onCleanup } from 'solid-js';
import { RESEND_TIMEOUT } from '~/entities/login-helper/constant';
import { LoginHelperStep } from '~/entities/login-helper/model';

export const createLoginHelperForm = () => {
  const [step, setStep] = createSignal<LoginHelperStep>('email');

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

  return {
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
  };
};
