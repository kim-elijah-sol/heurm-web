import { createSignal, onCleanup } from 'solid-js';
import { loginHelperConstant, LoginHelperType } from '~/entities/login-helper';
import { Nullable } from '~/shared/model';

export const createLoginHelperForm = () => {
  const [step, setStep] =
    createSignal<LoginHelperType.LoginHelperStep>('email');

  const [email, setEmail] = createSignal<string>('');

  const [password, setPassword] = createSignal<string>('');

  const [verifyCode, setVerifyCode] = createSignal<string>('');

  const [id, setId] = createSignal<string>('');

  const [restResendSecond, setRestResendSecond] = createSignal<number>(
    loginHelperConstant.RESEND_TIMEOUT
  );

  const [timerId, setTimerId] = createSignal<Nullable<number>>(null);

  const startCountDown = () => {
    setRestResendSecond(loginHelperConstant.RESEND_TIMEOUT);

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

  return {
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
  };
};
