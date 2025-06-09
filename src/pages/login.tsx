import { LoginBanner } from '~/features/login/ui';
import { LoginForm, LoginHelper } from '~/widgets/login';

function Login() {
  return (
    <div class='w-full h-dvh flex flex-col items-center justify-center bg-white'>
      <LoginBanner />
      <LoginForm />

      <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white my-6' />

      <LoginHelper />
    </div>
  );
}

export default Login;
