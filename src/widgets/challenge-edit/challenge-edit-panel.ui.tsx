import { useQueryClient } from '@tanstack/solid-query';
import {
  createSignal,
  Index,
  Match,
  onMount,
  Switch,
  type Accessor,
  type Component,
} from 'solid-js';
import { challengeEditQueries } from '~/entities/challenge-edit';
import {
  ChallengeEditDeleteButton,
  ChallengeEditNewItemButton,
  ChallengeEditNoChallengeItem,
  ChallengeEditTop,
} from '~/features/challenge-edit/ui';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import type { ChallengeColor } from '~/shared/types';
import { ChallengeColorSelect, Panel } from '~/shared/ui';
import { NewChallengeItemPanel } from '~/widgets/new-challenge-item';

type Props = {
  challengeId: Accessor<string>;
  title: Accessor<string>;
  color: Accessor<ChallengeColor>;
  close: () => void;
  newChallengeItemPanelOpen?: boolean;
};

export const ChallengeEditPanel: Component<Props> = (props) => {
  const [isNewChallengeItemPanel, open, newChallengeItemClose] =
    createBoolean();

  const [title, setTitle] = createSignal(props.title());

  const [color, setColor] = createSignal<ChallengeColor>(props.color());

  const queryClient = useQueryClient();

  const challengeItem = challengeEditQueries.getChallengeItemQuery(() => ({
    challengeId: props.challengeId(),
  }));

  const patchChallenge = challengeEditQueries.patchChallengeMutation();

  const isChanged = () =>
    title() !== props.title() || color() !== props.color();

  const handlePatchChallenge = async () => {
    await patchChallenge.mutateAsync({
      challengeId: props.challengeId(),
      title: title(),
      color: color(),
    });
  };

  const handleSave = async () => {
    await handlePatchChallenge();

    challengeItem.refetch();

    queryClient.invalidateQueries({
      queryKey: ['getChallenge'],
    });

    toast.open(`${title()} challenge has been updated`);
  };

  onMount(() => {
    if (props.newChallengeItemPanelOpen) {
      setTimeout(() => {
        open();
      }, 300);
    }
  });

  return (
    <Panel.Slide close={props.close}>
      {(close) => (
        <>
          <ChallengeEditTop close={close} title={title} setTitle={setTitle} />

          <div class='flex-1 overflow-y-auto flex flex-col items-center pb-20 pt-[60px]'>
            <ChallengeColorSelect
              color={color}
              setColor={setColor}
              className='mb-6'
            />

            <div class='flex justify-center mb-4'>
              <ChallengeEditNewItemButton
                onClick={open}
                pulse={() => challengeItem.data?.length === 0}
              />
              {isNewChallengeItemPanel() && (
                <NewChallengeItemPanel
                  close={newChallengeItemClose}
                  color={color}
                />
              )}
            </div>

            <Switch>
              <Match when={challengeItem.data && challengeItem.data.length > 0}>
                <div class='w-full flex flex-col gap-4 mb-4'>
                  <Index each={challengeItem.data}>
                    {(it) => <>{it().name}</>}
                  </Index>
                </div>
              </Match>
              <Match when={challengeItem.data?.length === 0}>
                <ChallengeEditNoChallengeItem color={color} />
              </Match>
            </Switch>

            <ChallengeEditDeleteButton
              challengeId={props.challengeId}
              originalTitle={props.title}
              onDeleted={close}
            />
          </div>

          <Panel.CTAButton
            color={color}
            onClick={handleSave}
            disabled={isChanged() === false}
          >
            Save
          </Panel.CTAButton>
        </>
      )}
    </Panel.Slide>
  );
};
