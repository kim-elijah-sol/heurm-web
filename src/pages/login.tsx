import { LoginBanner } from '~/features/login/ui';
import { LoginForm } from '~/widgets/login/ui';

function Login() {
  return (
    <div class='w-full h-dvh flex flex-col items-center justify-center bg-white'>
      <LoginBanner />
      <LoginForm />
    </div>
  );
}

export default Login;
