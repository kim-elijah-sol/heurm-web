import { useQueryClient } from '@tanstack/solid-query';
import clsx from 'clsx';
import { Accessor, Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { challengeEditQueries } from '~/entities/challenge-edit';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import './delete-challenge-item-confirm.ui.css';

type Props = {
  challengeId: Accessor<string>;
  id: Accessor<string>;
  name: Accessor<string>;
  onClosed: () => void;
};

export const DeleteChallengeItemConfirm: Component<Props> = (props) => {
  const [transition, startTransition, endTransition] = createBoolean(false);

  const close = () => {
    startTransition();
    setTimeout(() => {
      endTransition();
      props.onClosed();
    }, 300);
  };

  const queryClient = useQueryClient();

  const deleteChallengeItem =
    challengeEditQueries.deleteChallengeItemMutation();

  const handleClickDelete = async () => {
    await deleteChallengeItem.mutateAsync({
      challengeId: props.challengeId(),
      challengeItemId: props.id(),
    });

    queryClient.invalidateQueries({
      queryKey: ['getChallengeItem', props.challengeId()],
    });

    toast.open(`${props.name()} deleted successfully`);

    close();
  };

  return (
    <Portal>
      <div
        class={clsx(
          'fixed inset-0 bg-black/10 backdrop-blur-md z-[60] flex items-center justify-center wys-delete-challenge-item-confirm-bg-animation',
          transition() ? 'wys-delete-challenge-item-confirm-bg-fade-out' : ''
        )}
        onClick={close}
      >
        <div
          class='w-full mx-4 p-4 bg-white rounded-2xl wys-delete-challenge-item-confirm-fg-animation'
          onClick={(e) => e.stopPropagation()}
        >
          <p class='font-bold text-2xl mb-2'>🗑️ Delete {props.name()}</p>
          <p class='text-gray-400 font-medium text-sm mb-4'>
            Are you sure you want to delete this challenge item?
            <br />
            All related history will be deleted as well.
          </p>

          <div class='flex gap-3'>
            <button
              class='flex-1 h-[46px] font-semibold text-white rounded-[12px] transition-all bg-red-400 active:bg-red-500 active:scale-95'
              onClick={handleClickDelete}
            >
              Delete
            </button>
            <button
              onClick={close}
              class='flex-1 h-[46px] font-semibold text-gray-500 rounded-[12px] transition-all border border-gray-500 active:bg-gray-200 active:scale-95'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
