import { useQueryClient } from '@tanstack/solid-query';
import clsx from 'clsx';
import { type Accessor, type Component, createSignal } from 'solid-js';
import { challengeEditQueries } from '~/entities/challenge-edit';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';

import './challenge-edit-delete-button.ui.css';

type Props = {
  challengeId: Accessor<string>;
  originalTitle: Accessor<string>;
  onDeleted: () => void;
};

export const ChallengeEditDeleteButton: Component<Props> = (props) => {
  const [isDeleteConfirm, open, _close] = createBoolean();

  const [transition, setTransition] = createSignal(false);

  const [deleteConfirmText, setDeleteConfirmText] = createSignal('');

  const isDeletable = () => props.originalTitle() === deleteConfirmText();

  const close = (callback?: () => void) => {
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
      _close();
      callback?.();
    }, 300);
  };

  const queryClient = useQueryClient();

  const deleteChallenge = challengeEditQueries.deleteChallengeMutation(() => {
    toast.open(`${props.originalTitle()} deleted successfully`);

    queryClient.invalidateQueries({
      queryKey: ['getChallenge'],
    });

    close(props.onDeleted);
  });

  return (
    <>
      <button
        onClick={open}
        class='font-semibold text-slate-300 py-2 px-3 rounded-[12px] active:bg-slate-100 active:scale-95 transition-all'
      >
        Delete This Challenge
      </button>
      {isDeleteConfirm() && (
        <div
          class={clsx(
            'fixed inset-0 bg-black/10 backdrop-blur-md z-[60] flex items-center justify-center wys-challenge-edit-delete-button-confirm-bg-animation',
            transition()
              ? 'wys-challenge-edit-delete-button-confirm-bg-fade-out'
              : ''
          )}
          onClick={() => close()}
        >
          <div
            class='w-full mx-4 p-4 bg-white rounded-2xl wys-challenge-edit-delete-button-confirm-fg-animation'
            onClick={(e) => e.stopPropagation()}
          >
            <p class='font-bold text-2xl mb-2'>🗑️ Delete Challenge</p>
            <p class='text-gray-400 font-medium text-sm mb-2'>
              Are you sure you want to delete this challenge?
              <br />
              All related challenge items and historys will be permanently
              removed.
            </p>

            <p class='text-gray-400 font-medium text-sm mb-[10px]'>
              To confirm, please type{' '}
              <span class='font-bold text-gray-600'>
                {props.originalTitle()}
              </span>{' '}
              below.
            </p>

            <input
              type='text'
              placeholder='type challenge title'
              value={deleteConfirmText()}
              onInput={(e) => setDeleteConfirmText(e.target.value)}
              class='font-semibold px-4 py-3 rounded-[12px] w-full transition-all bg-slate-100 focus:bg-slate-200 mb-4'
            />

            <div class='flex gap-3'>
              <button
                class={clsx(
                  'flex-1 h-[46px] font-semibold text-white rounded-[12px] transition-all',
                  isDeletable()
                    ? 'bg-red-400 active:bg-red-500 active:scale-95'
                    : 'bg-gray-200'
                )}
                onClick={() => {
                  if (isDeletable()) {
                    deleteChallenge.mutate({
                      challengeId: props.challengeId(),
                    });
                  }
                }}
              >
                Delete
              </button>
              <button
                onClick={() => close()}
                class='flex-1 h-[46px] font-semibold text-gray-500 rounded-[12px] transition-all border border-gray-500 active:bg-gray-200 active:scale-95'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
