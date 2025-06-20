import { useQueryClient } from '@tanstack/solid-query';
import { format } from 'date-fns';
import {
  createSignal,
  Index,
  Match,
  onMount,
  Switch,
  type Accessor,
  type Component,
} from 'solid-js';
import {
  challengeEditQueries,
  challengeEditSchema,
} from '~/entities/challenge-edit';
import { createChallengeItemsForm } from '~/features/challenge-edit/hook';
import {
  ChallengeEditDeleteButton,
  ChallengeEditItem,
  ChallengeEditNewItemButton,
  ChallengeEditNoChallengeItem,
  ChallengeEditTop,
} from '~/features/challenge-edit/ui';
import { createDateSelect } from '~/features/main/hook';
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
  const { current } = createDateSelect();

  const [isNewChallengeItemPanel, open, newChallengeItemClose] =
    createBoolean();

  const [title, setTitle] = createSignal(props.title());

  const [color, setColor] = createSignal<ChallengeColor>(props.color());

  const queryClient = useQueryClient();

  const challengeItem = challengeEditQueries.getChallengeItemQuery(() => ({
    challengeId: props.challengeId(),
  }));

  const patchChallenge = challengeEditQueries.patchChallengeMutation();

  const patchChallengeItem = challengeEditQueries.patchChallengeItemMutation();

  const postChallengeItem = challengeEditQueries.postChallengeItemMutation();

  const deleteChallengeItem =
    challengeEditQueries.deleteChallengeItemMutation();

  const {
    challengeItems: _challengeItems,
    handleChangeDay,
    handleChangeName,
    handleChangeTargetCount,
    handleChangeUnit,
    handleDeleteChallengeItem,
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
          unit: it.unit ?? '',
        };
      }) ?? []
  );

  const challengeItems = () =>
    _challengeItems.filter((it) => it.isDelete !== true);

  const editedChallengeItems = () =>
    challengeItems().filter((it) => {
      const targetChallengeItem = challengeItem.data?.find(
        (_it) => it.id === _it.id
      );

      if (!targetChallengeItem) return false;

      if (
        it.name !== targetChallengeItem.name ||
        it.days.length !== targetChallengeItem.days.length ||
        !it.days.every((day) => targetChallengeItem.days.includes(day))
      ) {
        return true;
      }

      if (
        it.type !== 'COMPLETE' &&
        it.targetCount !== targetChallengeItem.targetCount
      ) {
        return true;
      }

      return false;
    });

  const newChallengeItems = () => challengeItems().filter((it) => it.isNew);

  const deleteChallengeItems = () =>
    _challengeItems.filter((it) => it.isDelete);

  const handlePatchChallenge = async () => {
    if (title() !== props.title() || color() !== props.color()) {
      await patchChallenge.mutateAsync({
        challengeId: props.challengeId(),
        title: title(),
        color: color(),
      });

      return true;
    }

    return false;
  };

  const handlePatchChallengeItems = async () => {
    if (editedChallengeItems().length > 0) {
      await Promise.allSettled(
        editedChallengeItems().map((it) => {
          const baseData = {
            challengeId: props.challengeId(),
            challengeItemId: it.id,
            name: it.name,
            type: it.type,
            days: it.days,
            date: format(new Date(), 'yyyy-MM-dd'),
          };

          if (it.type === 'COMPLETE') {
            return patchChallengeItem.mutateAsync(baseData);
          } else {
            return patchChallengeItem.mutateAsync({
              ...baseData,
              targetCount: it.targetCount,
              unit: it.unit,
            });
          }
        })
      );

      return true;
    }

    return false;
  };

  const handlePostChallengeItems = async () => {
    if (newChallengeItems().length > 0) {
      await Promise.allSettled(
        newChallengeItems().map((it) => {
          const baseData = {
            challengeId: props.challengeId(),
            name: it.name,
            type: it.type,
            days: it.days,
          };

          if (it.type === 'COMPLETE') {
            return postChallengeItem.mutateAsync(baseData);
          } else {
            return postChallengeItem.mutateAsync({
              ...baseData,
              targetCount: it.targetCount,
              unit: it.unit,
            });
          }
        })
      );

      return true;
    }

    return false;
  };

  const handleDeleteChallengeItems = async () => {
    if (deleteChallengeItems().length > 0) {
      await Promise.allSettled(
        deleteChallengeItems().map((it) => {
          return deleteChallengeItem.mutateAsync({
            challengeId: props.challengeId(),
            challengeItemId: it.id,
          });
        })
      );

      return true;
    }

    return false;
  };

  const getPatchChallengeRequestErrorMessage = () => {
    const patchChallengeRequestParse =
      challengeEditSchema.patchChallengeRequestSchema.safeParse({
        challengeId: props.challengeId(),
        title: title(),
        color: color(),
      });

    if (patchChallengeRequestParse.success === false) {
      return patchChallengeRequestParse.error.errors[0].message;
    }

    return null;
  };

  const getPatchChallengeItemRequestErrorMessage = () => {
    if (editedChallengeItems().length > 0) {
      const patchChallengeItemRequestParse = editedChallengeItems().map(
        (it) => {
          const baseData = {
            challengeId: props.challengeId(),
            challengeItemId: it.id,
            name: it.name,
            type: it.type,
            days: it.days,
            date: format(new Date(), 'yyyy-MM-dd'),
          };

          if (it.type === 'COMPLETE') {
            return challengeEditSchema.patchChallengeItemRequestSchema.safeParse(
              baseData
            );
          } else {
            return challengeEditSchema.patchChallengeItemRequestSchema.safeParse(
              {
                ...baseData,
                targetCount: it.targetCount,
                unit: it.unit,
              }
            );
          }
        }
      );

      return (
        patchChallengeItemRequestParse.find(
          (parseResult) => parseResult.success === false
        )?.error?.errors[0].message ?? null
      );
    }

    return null;
  };

  const getPostChallengeItemRequestErrorMessage = () => {
    if (newChallengeItems().length > 0) {
      const postChallengeItemRequestParse = newChallengeItems().map((it) => {
        const baseData = {
          challengeId: props.challengeId(),
          name: it.name,
          type: it.type,
          days: it.days,
        };

        if (it.type === 'COMPLETE') {
          return challengeEditSchema.postChallengeItemRequestSchema.safeParse(
            baseData
          );
        } else {
          return challengeEditSchema.postChallengeItemRequestSchema.safeParse({
            ...baseData,
            targetCount: it.targetCount,
            unit: it.unit,
          });
        }
      });

      return (
        postChallengeItemRequestParse.find(
          (parseResult) => parseResult.success === false
        )?.error?.errors[0].message ?? null
      );
    }

    return null;
  };

  const saveErrorMessage = () => {
    const patchChallengeRequestErrorMessage =
      getPatchChallengeRequestErrorMessage();

    if (patchChallengeRequestErrorMessage) {
      return patchChallengeRequestErrorMessage;
    }

    const patchChallengeItemRequestErrorMessage =
      getPatchChallengeItemRequestErrorMessage();

    if (patchChallengeItemRequestErrorMessage) {
      return patchChallengeItemRequestErrorMessage;
    }

    const postChallengeItemRequestErrorMessage =
      getPostChallengeItemRequestErrorMessage();

    if (postChallengeItemRequestErrorMessage) {
      return postChallengeItemRequestErrorMessage;
    }

    return null;
  };

  const handleSave = (callback: () => void) => async () => {
    if (saveErrorMessage()) {
      toast.open(saveErrorMessage()!);
      return;
    }

    let challengeHit = false;

    let challengeItemHit = false;

    if (await handlePatchChallenge()) challengeHit = true;

    if (await handlePatchChallengeItems()) challengeItemHit = true;

    if (await handlePostChallengeItems()) challengeItemHit = true;

    if (await handleDeleteChallengeItems()) challengeItemHit = true;

    toast.open(`${title()} challenge has been updated`);

    callback();

    if (challengeHit) {
      queryClient.invalidateQueries({
        queryKey: ['getChallenge'],
      });
    }

    if (challengeItemHit) {
      queryClient.invalidateQueries({
        queryKey: [
          'getChallengeItemByDate',
          props.challengeId(),
          format(current(), 'yyyy-MM-dd'),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ['getChallengeOverview', format(current(), 'yyyy-MM-dd')],
      });
      queryClient.invalidateQueries({
        queryKey: ['getHistoryByWeek'],
      });
      challengeItem.refetch();
    }
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
                pulse={() => challengeItems().length === 0}
              />
              {isNewChallengeItemPanel() && (
                <NewChallengeItemPanel
                  onSubmit={(it) => {
                    handleNewChallengeItem(it);
                  }}
                  close={newChallengeItemClose}
                  color={color}
                />
              )}
            </div>

            <Switch>
              <Match when={challengeItems().length > 0}>
                <div class='w-full flex flex-col gap-4 mb-4'>
                  <Index each={challengeItems()}>
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
                        deleteButton={
                          <ChallengeEditItem.DeleteButton
                            onDelete={() => handleDeleteChallengeItem(it().id)}
                          />
                        }
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
                        unitInput={
                          it().type !== 'COMPLETE' && (
                            <ChallengeEditItem.UnitInput
                              unit={(it() as { unit: string }).unit}
                              onChangeUnit={(unit) =>
                                handleChangeUnit(it().id, unit)
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
              <Match when={challengeItems().length === 0}>
                <ChallengeEditNoChallengeItem color={color} />
              </Match>
            </Switch>

            <ChallengeEditDeleteButton
              challengeId={props.challengeId}
              originalTitle={props.title}
              onDeleted={close}
            />
          </div>

          <Panel.CTAButton color={color} onClick={handleSave(close)}>
            Save
          </Panel.CTAButton>
        </>
      )}
    </Panel.Slide>
  );
};
