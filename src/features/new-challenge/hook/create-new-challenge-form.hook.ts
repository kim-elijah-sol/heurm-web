import { useQueryClient } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';
import {
  newChallengeQueries,
  newChallengeSchema,
} from '~/entities/new-challenge';
import { toast } from '~/shared/lib';
import { ChallengeColor } from '~/shared/model';

export const createNewChallengeForm = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = createSignal<string>('');

  const [color, setColor] = createSignal<ChallengeColor>('red');

  const postChallege = newChallengeQueries.postChallengeMutation((data) => {
    toast.open(`🎉 '${data.title}' Challenge is added!`);

    queryClient.invalidateQueries({
      queryKey: ['getChallenge'],
    });
  });

  const handleInputTitle = (e: InputEvent & { target: HTMLInputElement }) => {
    setTitle(e.target.value.trim());
  };

  const submitDisabled = () => {
    return (
      newChallengeSchema.postChallengeRequestSchema.safeParse({
        title: title(),
        color: color(),
      }).success === false
    );
  };

  const handleSubmit = (callback: () => void) => async (e: SubmitEvent) => {
    e.preventDefault();

    if (submitDisabled()) return;

    await postChallege.mutateAsync({
      title: title(),
      color: color(),
    });

    callback();
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
