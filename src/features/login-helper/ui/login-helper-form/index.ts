import { DoneStep } from './done-step.ui';
import { EmailStep } from './email-step.ui';
import { LoginHelperForm as _LoginHelperForm } from './login-helper-form.ui';
import { PasswordStep } from './password-step.ui';
import { VerifyStep } from './verify-step.ui';

export const LoginHelperForm = Object.assign(_LoginHelperForm, {
  Email: EmailStep,
  Password: PasswordStep,
  Verify: VerifyStep,
  Done: DoneStep,
});
