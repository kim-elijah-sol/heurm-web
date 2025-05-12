import { EmailStep } from './email-step.ui';
import { JoinForm as _JoinForm } from './join-form.ui';
import { PasswordStep } from './password-step.ui';
import { VerifyStep } from './verify-step.ui';

export const JoinForm = Object.assign(_JoinForm, {
  Email: EmailStep,
  Password: PasswordStep,
  Verify: VerifyStep,
});
