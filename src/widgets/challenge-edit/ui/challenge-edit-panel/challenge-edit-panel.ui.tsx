import { useQueryClient } from '@tanstack/solid-query';
import {
  Accessor,
  Component,
  createSignal,
  Index,
  Match,
  onMount,
  Switch,
} from 'solid-js';
import { challengeEditQueries } from '~/entities/challenge-edit';
import { patchChallengeRequestSchema } from '~/entities/challenge-edit/challenge-edit.schema';
import { createChallengeItemsForm } from '~/features/challenge-edit/hook';
import {
  ChallengeEditDeleteButton,
  ChallengeEditItem,
  ChallengeEditNewItemButton,
  ChallengeEditNoChallengeItem,
  ChallengeEditTop,
} from '~/features/challenge-edit/ui';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import { ChallengeColor } from '~/shared/model';
import { ChallengeColorSelect, Panel } from '~/shared/ui';
import { NewChallengeItemPanel } from '~/widgets/new-challenge-item/ui';

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

  const {
    challengeItems,
    handleChangeDay,
    handleChangeName,
    handleChangeTargetCount,
    handleNewChallengeItem,
  } = createChallengeItemsForm(
    () =>
      challengeItem.data?.map((it) => {
        if (it.type === 'COMPLETE') {
          return {
            type: 'COMPLETE',
            id: it.id,
            days: it.days,
            name: it.name,
          };
        }

        return {
          type: it.type as 'OVER' | 'UNDER',
          id: it.id,
          days: it.days,
          name: it.name,
          targetCount: it.targetCount!,
        };
      }) ?? []
  );

  const saveErrorMessage = () => {
    const patchChallengeRequestParse = patchChallengeRequestSchema.safeParse({
      challengeId: props.challengeId(),
      title: title(),
      color: color(),
    });

    if (patchChallengeRequestParse.success === false) {
      return patchChallengeRequestParse.error.errors[0].message;
    }

    return null;
  };

  const handlePatchChallenge = async () => {
    if (title() !== props.title() || color() !== props.color()) {
      await patchChallenge.mutateAsync({
        challengeId: props.challengeId(),
        title: title(),
        color: color(),
      });
    }
  };

  const handleSave = (callback: () => void) => async () => {
    if (saveErrorMessage()) {
      toast.open(saveErrorMessage()!);
      return;
    }

    await handlePatchChallenge();

    toast.open(`${title()} challenge has been updated`);

    callback();

    queryClient.invalidateQueries({
      queryKey: ['getChallenge'],
    });
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
                pulse={() => challengeItems.length === 0}
              />
              {isNewChallengeItemPanel() && (
                <NewChallengeItemPanel
                  onSubmit={(it) => {
                    console.log(it);
                  }}
                  close={newChallengeItemClose}
                />
              )}
            </div>

            <Switch>
              <Match when={challengeItems.length > 0}>
                <div class='w-full flex flex-col gap-4 mb-4'>
                  <Index each={challengeItems}>
                    {(it) => (
                      <ChallengeEditItem
                        color={color}
                        nameInput={
                          <ChallengeEditItem.NameInput
                            name={it().name}
                            onChangeName={(name) =>
                              handleChangeName(it().id, name)
                            }
                          />
                        }
                        typeLabel={
                          <ChallengeEditItem.TypeLabel type={it().type} />
                        }
                        deleteButton={<ChallengeEditItem.DeleteButton />}
                        targetCountInput={
                          it().type !== 'COMPLETE' && (
                            <ChallengeEditItem.TargetCountInput
                              targetCount={
                                (it() as { targetCount: number }).targetCount
                              }
                              onChangeTargetColor={(targetCount) =>
                                handleChangeTargetCount(it().id, targetCount)
                              }
                            />
                          )
                        }
                        daySelect={
                          <ChallengeEditItem.DaySelect
                            day={it().days}
                            onChangeDay={(day) => handleChangeDay(it().id, day)}
                          />
                        }
                      />
                    )}
                  </Index>
                </div>
              </Match>
              <Match when={challengeItems.length === 0}>
                <ChallengeEditNoChallengeItem color={color} />
              </Match>
            </Switch>

            <ChallengeEditDeleteButton />
          </div>

          <Panel.CTAButton color={color} onClick={handleSave(close)}>
            Save
          </Panel.CTAButton>
        </>
      )}
    </Panel.Slide>
  );
};
