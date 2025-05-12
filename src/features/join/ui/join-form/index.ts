import { EmailStep } from './email-step.ui';
import { JoinForm as _JoinForm } from './join-form.ui';
import { PasswordStep } from './password-step.ui';

export const JoinForm = Object.assign(_JoinForm, {
  Email: EmailStep,
  Password: PasswordStep,
});
