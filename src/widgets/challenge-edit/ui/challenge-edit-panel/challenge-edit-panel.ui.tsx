import {
  Accessor,
  Component,
  createSignal,
  Index,
  Match,
  onMount,
  Switch,
} from 'solid-js';
import { createChallengeItemsForm } from '~/features/challenge-edit/hook';
import {
  ChallengeEditDeleteButton,
  ChallengeEditItem,
  ChallengeEditNewItemButton,
  ChallengeEditNoChallengeItem,
  ChallengeEditSaveButton,
  ChallengeEditTop,
} from '~/features/challenge-edit/ui';
import { createBoolean } from '~/shared/hook';
import {
  ChallengeColor,
  ChallengeItem,
  CountableChallengeItem,
} from '~/shared/model';
import { ChallengeColorSelect, Panel } from '~/shared/ui';
import { NewChallengeItemPanel } from '~/widgets/new-challenge-item/ui';

type Props = {
  title: Accessor<string>;
  close: () => void;
  color: Accessor<ChallengeColor>;
  challengeItems: Accessor<(ChallengeItem & { id: number })[]>;

  newChallengeItemPanelOpen?: boolean;
};

export const ChallengeEditPanel: Component<Props> = (props) => {
  const [isNewChallengeItemPanel, open, newChallengeItemClose] =
    createBoolean();

  const [title, setTitle] = createSignal(props.title());

  const [color, setColor] = createSignal<ChallengeColor>(props.color());

  const {
    challengeItems,
    handleChangeDay,
    handleChangeName,
    handleChangeTargetCount,
    handleNewChallengeItem,
  } = createChallengeItemsForm(props.challengeItems());

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
                  onSubmit={handleNewChallengeItem}
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
                          it().type !== 'complete' && (
                            <ChallengeEditItem.TargetCountInput
                              targetCount={
                                (it() as CountableChallengeItem).targetCount
                              }
                              onChangeTargetColor={(targetCount) =>
                                handleChangeTargetCount(it().id, targetCount)
                              }
                            />
                          )
                        }
                        daySelect={
                          <ChallengeEditItem.DaySelect
                            day={it().day}
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

          <ChallengeEditSaveButton color={color} />
        </>
      )}
    </Panel.Slide>
  );
};
