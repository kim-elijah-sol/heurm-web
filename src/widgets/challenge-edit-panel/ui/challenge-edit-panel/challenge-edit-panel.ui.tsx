import { createSignal, Index } from 'solid-js';
import { createChallengeItemsForm } from '~/features/challenge-edit-panel/hook';
import {
  ChallengeEditPanelDeleteButton,
  ChallengeEditPanelItem,
  ChallengeEditPanelNewItemButton,
  ChallengeEditPanelSaveButton,
  ChallengeEditPanelTop,
} from '~/features/challenge-edit-panel/ui';
import { createBoolean } from '~/shared/hook';
import {
  ChallengeColor,
  ChallengeItemType,
  CountableChallengeItemType,
} from '~/shared/model';
import { ChallengeColorSelect, SlidePanel } from '~/shared/ui';
import { NewChallengeItemPanel } from '~/widgets/new-challenge-item-panel/ui';

type Props = {
  title: string;
  close: () => void;
  color: ChallengeColor;
  challengeItems: (ChallengeItemType & { id: number })[];
};

export const ChallengeEditPanel = (props: Props) => {
  const [isNewChallengeItemPanel, open, newChallengeItemClose] =
    createBoolean();

  const [title, setTitle] = createSignal(props.title);

  const [color, setColor] = createSignal<ChallengeColor>(props.color);

  const {
    challengeItems,
    handleChangeDay,
    handleChangeName,
    handleChangeTargetCount,
    handleNewChallengeItem,
  } = createChallengeItemsForm(props.challengeItems);

  return (
    <SlidePanel close={props.close}>
      {(close) => (
        <>
          <ChallengeEditPanelTop
            close={close}
            title={title}
            setTitle={setTitle}
          />

          <div class='flex-1 overflow-y-auto flex flex-col items-center pb-20 pt-[60px]'>
            <ChallengeColorSelect
              color={color()}
              setColor={setColor}
              className='mb-6'
            />

            <div class='flex justify-center mb-4'>
              <ChallengeEditPanelNewItemButton onClick={open} />
              {isNewChallengeItemPanel() && (
                <NewChallengeItemPanel
                  onSubmit={handleNewChallengeItem}
                  close={newChallengeItemClose}
                />
              )}
            </div>

            <div class='w-full flex flex-col gap-4 mb-4'>
              <Index each={challengeItems}>
                {(it) => (
                  <ChallengeEditPanelItem
                    color={color}
                    nameInput={
                      <ChallengeEditPanelItem.NameInput
                        name={it().name}
                        onChangeName={(name) => handleChangeName(it().id, name)}
                      />
                    }
                    typeLabel={
                      <ChallengeEditPanelItem.TypeLabel type={it().type} />
                    }
                    deleteButton={<ChallengeEditPanelItem.DeleteButton />}
                    targetCountInput={
                      it().type !== 'complete' && (
                        <ChallengeEditPanelItem.TargetCountInput
                          targetCount={
                            (it() as CountableChallengeItemType).targetCount
                          }
                          onChangeTargetColor={(targetCount) =>
                            handleChangeTargetCount(it().id, targetCount)
                          }
                        />
                      )
                    }
                    daySelect={
                      <ChallengeEditPanelItem.DaySelect
                        day={it().day}
                        onChangeDay={(day) => handleChangeDay(it().id, day)}
                      />
                    }
                  />
                )}
              </Index>
            </div>

            <ChallengeEditPanelDeleteButton />
          </div>

          <ChallengeEditPanelSaveButton color={color()} />
        </>
      )}
    </SlidePanel>
  );
};
