import { createSignal } from 'solid-js';
import { newChallengeFormValidator } from '~/entities/new-challenge/validator';
import { ChallengeColor } from '~/shared/model';

export const createNewChallengeForm = () => {
  const [title, setTitle] = createSignal<string>('');

  const [color, setColor] = createSignal<ChallengeColor>('red');

  const handleInputTitle = (e: InputEvent & { target: HTMLInputElement }) => {
    setTitle(e.target.value.trim());
  };

  const formErrorMessage = () => {
    const newChallengeFormValid = newChallengeFormValidator.safeParse({
      title: title(),
      color: color(),
    });

    if (newChallengeFormValid.success === false) {
      return newChallengeFormValid.error.errors[0].message;
    }

    return null;
  };

  const submitDisabled = () => {
    return formErrorMessage() !== null;
  };

  const handleSubmit =
    (e: SubmitEvent) =>
    (callback: (form: { title: string; color: ChallengeColor }) => void) => {
      e.preventDefault();

      if (formErrorMessage()) {
        alert(formErrorMessage());
        return;
      }

      callback({
        title: title(),
        color: color(),
      });
    };

  return {
    title,
    handleInputTitle,
    color,
    setColor,
    handleSubmit,
    submitDisabled,
  };
};
