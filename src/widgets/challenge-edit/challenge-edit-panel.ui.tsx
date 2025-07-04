import { useQueryClient } from '@tanstack/solid-query';
import clsx from 'clsx';
import {
  createSignal,
  Index,
  Match,
  onMount,
  Show,
  Switch,
  type Accessor,
  type Component,
} from 'solid-js';
import {
  challengeEditQueries,
  ChallengeEditType,
} from '~/entities/challenge-edit';
import {
  ChallengeEditDeleteButton,
  ChallengeEditItem,
  ChallengeEditNewItemButton,
  ChallengeEditNoChallengeItem,
  ChallengeEditTop,
  DeleteChallengeItemConfirm,
} from '~/features/challenge-edit/ui';
import { FLOW_TEXT_500 } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import type { FlowColor, Nullable } from '~/shared/types';
import { FlowColorSelect, Grid2x2, Panel, Rows3 } from '~/shared/ui';
import { NewChallengeItemPanel } from '~/widgets/new-challenge-item';
import { EditChallengeItemPanel } from '../edit-challenge-item';

type Props = {
  challengeId: Accessor<string>;
  title: Accessor<string>;
  color: Accessor<FlowColor>;
  close: () => void;
  newChallengeItemPanelOpen?: boolean;
};

type ViewType = 'grid' | 'col';

const getViewTypeInStorage = (): ViewType => {
  const viewType = localStorage.getItem('view-type');

  if (viewType !== 'grid' && viewType !== 'col') return 'col';

  return viewType;
};

export const ChallengeEditPanel: Component<Props> = (props) => {
  const [isNewChallengeItemPanel, open, newChallengeItemClose] =
    createBoolean();

  const [title, setTitle] = createSignal(props.title());

  const [color, setColor] = createSignal<FlowColor>(props.color());

  const [viewType, _setViewType] = createSignal<ViewType>(
    getViewTypeInStorage()
  );

  const [deleteTarget, setDeleteTarget] = createSignal<
    Nullable<{
      id: string;
      name: string;
    }>
  >(null);

  const [editTarget, setEditTarget] =
    createSignal<Nullable<ChallengeEditType.GetChallengeItemResponseItem>>(
      null
    );

  const setViewType = (viewType: ViewType) => {
    _setViewType(viewType);
    localStorage.setItem('view-type', viewType);
  };

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

    queryClient.invalidateQueries({
      queryKey: ['getChallenge'],
    });

    toast.open(`${title()} challenge has been updated`);
  };

  const handleClickDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  onMount(() => {
    if (props.newChallengeItemPanelOpen) {
      setTimeout(() => {
        open();
      }, 300);
    }
  });

  return (
    <>
      <Panel.Slide close={props.close}>
        {(close) => (
          <>
            <ChallengeEditTop close={close} title={title} setTitle={setTitle} />

            <div class='flex-1 overflow-y-auto flex flex-col items-center pb-20 pt-[60px]'>
              <FlowColorSelect
                color={color}
                setColor={setColor}
                className='mb-6'
              />

              <div class='flex justify-center mb-4'>
                <ChallengeEditNewItemButton
                  onClick={open}
                  pulse={() => challengeItem.data?.length === 0}
                />
              </div>

              <Switch>
                <Match
                  when={challengeItem.data && challengeItem.data.length > 0}
                >
                  <div class='flex justify-end w-full gap-2 mb-2'>
                    <button
                      onClick={() => setViewType('grid')}
                      class={clsx(
                        'p-2 rounded-[42%] transition-all active:bg-gray-100 active:scale-95',
                        viewType() === 'grid'
                          ? FLOW_TEXT_500[color()]
                          : 'text-gray-300'
                      )}
                    >
                      <Grid2x2 />
                    </button>
                    <button
                      onClick={() => setViewType('col')}
                      class={clsx(
                        'p-2 rounded-[42%] transition-all active:bg-gray-100 active:scale-95',
                        viewType() === 'col'
                          ? FLOW_TEXT_500[color()]
                          : 'text-gray-300'
                      )}
                    >
                      <Rows3 />
                    </button>
                  </div>

                  <Show when={viewType() === 'col'}>
                    <div class='w-full flex flex-col gap-4 mb-4'>
                      <Index each={challengeItem.data!}>
                        {(it) => (
                          <ChallengeEditItem.Col
                            color={color}
                            {...it()}
                            onClickDelete={() =>
                              handleClickDelete(it().id, it().name)
                            }
                            onClickEdit={() => setEditTarget({ ...it() })}
                          />
                        )}
                      </Index>
                    </div>
                  </Show>
                  <Show when={viewType() === 'grid'}>
                    <div class='w-full grid grid-cols-2 gap-3 mb-4'>
                      <Index each={challengeItem.data!}>
                        {(it) => (
                          <ChallengeEditItem.Grid
                            color={color}
                            {...it()}
                            onClickDelete={() =>
                              handleClickDelete(it().id, it().name)
                            }
                            onClickEdit={() => setEditTarget({ ...it() })}
                          />
                        )}
                      </Index>
                    </div>
                  </Show>
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
      {isNewChallengeItemPanel() && (
        <NewChallengeItemPanel
          close={newChallengeItemClose}
          color={color}
          challengeId={props.challengeId}
        />
      )}

      {editTarget() && (
        <EditChallengeItemPanel
          close={() => setEditTarget(null)}
          color={color}
          challengeId={props.challengeId}
          challengeItem={() => editTarget()!}
        />
      )}

      {deleteTarget() && (
        <DeleteChallengeItemConfirm
          challengeId={props.challengeId}
          id={() => deleteTarget()!.id}
          name={() => deleteTarget()!.name}
          onClosed={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
};
