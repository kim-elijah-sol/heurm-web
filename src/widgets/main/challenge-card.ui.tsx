import { clsx } from 'clsx';
import { For, Match, Switch, type Accessor, type Component } from 'solid-js';
import { challengeEditQueries } from '~/entities/challenge-edit';
import { filterTodayChallengeItem } from '~/features/main/fx';
import { createDateSelect } from '~/features/main/hook';
import { ChallengeItem, NoChallengeItem } from '~/features/main/ui';
import { CHALLENGE_100_BG_COLOR, CHALLENGE_BG_COLOR } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type { ChallengeColor } from '~/shared/types';
import { ChartLine, Menu } from '~/shared/ui';
import { ChallengeEditPanel } from '~/widgets/challenge-edit';

type Props = {
  id: Accessor<string>;
  title: Accessor<string>;
  color: Accessor<ChallengeColor>;
};

export const ChallengeCard: Component<Props> = (props) => {
  const { current } = createDateSelect();

  const [
    isChallengeEditPanel,
    openChallengeEditPanel,
    _closeChallengeEditPanel,
  ] = createBoolean();

  const [isAnalycisPanel, openAnalycisPanel, closeAnalycisPanel] =
    createBoolean();

  const closeChallengeEditPanel = () => {
    newChallengeItemPanelOpen = false;
    _closeChallengeEditPanel();
  };

  let newChallengeItemPanelOpen = false;

  const challengeItem = challengeEditQueries.getChallengeItemQuery(() => ({
    challengeId: props.id(),
  }));

  const topClassName = () =>
    clsx(
      'pl-4 pr-3 py-2 flex items-center justify-between',
      CHALLENGE_BG_COLOR[props.color()]
    );

  const topButtonClassName =
    'p-1 rounded-[42%] transition-all active:bg-[#FFFFFF30] active:scale-90';

  const itemsContainerClassName = () =>
    clsx(
      'px-2 py-3 flex flex-col gap-3',
      CHALLENGE_100_BG_COLOR[props.color()]
    );

  const totalCount = () => challengeItem.data?.length ?? 0;

  const todayChallengeItems = () =>
    challengeItem.data?.filter(filterTodayChallengeItem(current().valueOf())) ??
    [];

  return (
    <div
      class='overflow-hidden rounded-2xl'
      style={{
        order: todayChallengeItems().length
          ? -1 * todayChallengeItems().length
          : totalCount() === 0
          ? 0
          : 1,
      }}
    >
      <div class={topClassName()}>
        <p class='font-semibold text-white'>{props.title()}</p>
        <div class='flex gap-[6px]'>
          <button class={topButtonClassName} onClick={openAnalycisPanel}>
            <ChartLine />
          </button>
          <button class={topButtonClassName} onClick={openChallengeEditPanel}>
            <Menu />
          </button>
        </div>
      </div>
      <div class={itemsContainerClassName()}>
        <For each={todayChallengeItems()}>
          {(challengeItem) => {
            return (
              <Switch>
                <Match when={challengeItem.type === 'COMPLETE'}>
                  <ChallengeItem.Complete
                    color={props.color}
                    name={() => challengeItem.name}
                    challengeId={props.id}
                    challengeItemId={() => challengeItem.id}
                  />
                </Match>
                <Match when={challengeItem.type !== 'COMPLETE'}>
                  <ChallengeItem.Countable
                    color={props.color}
                    challengeId={props.id}
                    type={() => challengeItem.type as 'OVER' | 'UNDER'}
                    challengeItem={() => challengeItem}
                  />
                </Match>
              </Switch>
            );
          }}
        </For>
        {totalCount() === 0 && (
          <NoChallengeItem
            color={() => props.color()}
            onClick={() => {
              newChallengeItemPanelOpen = true;
              openChallengeEditPanel();
            }}
          />
        )}

        {todayChallengeItems().length === 0 && totalCount() !== 0 && (
          <NoChallengeItem.Today color={() => props.color()} />
        )}
      </div>

      {isChallengeEditPanel() && (
        <ChallengeEditPanel
          challengeId={props.id}
          title={props.title}
          color={props.color}
          close={closeChallengeEditPanel}
          newChallengeItemPanelOpen={newChallengeItemPanelOpen}
        />
      )}

      {/* {isAnalycisPanel() && (
        <AnalyticsPanel
          title={props.title}
          color={props.color}
          close={closeAnalycisPanel}
          challengeItems={props.challengeItems}
        />
      )} */}
    </div>
  );
};
