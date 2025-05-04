import { createSignal, Index } from 'solid-js';
import {
  ChallengeItemType,
  CHALLENGE_COLOR,
  CountableChallengeItemType,
} from '~/entities/main';
import {
  ChallengeColorSelect,
  ChallengeSlidePanelDeleteButton,
  ChallengeSlidePanelItem,
  ChallengeSlidePanelNewItemButton,
  ChallengeSlidePanelSaveButton,
  ChallengeSlidePanelTop,
  createChallengeItemsForm,
} from '~/features/main';
import { SlidePanel } from '~/shared/ui';

type Props = {
  title: string;
  close: () => void;
  color: (typeof CHALLENGE_COLOR)[number];
  challengeItems: (ChallengeItemType & { id: number })[];
};

export const ChallengeSlidePanel = (props: Props) => {
  const [title, setTitle] = createSignal(props.title);

  const [color, setColor] = createSignal<(typeof CHALLENGE_COLOR)[number]>(
    props.color
  );

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
          <ChallengeSlidePanelTop
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
              <ChallengeSlidePanelNewItemButton
                onNewChallengeItem={handleNewChallengeItem}
              />
            </div>

            <div class='w-full flex flex-col gap-4 mb-4'>
              <Index each={challengeItems}>
                {(it) => (
                  <ChallengeSlidePanelItem
                    color={color}
                    nameInput={
                      <ChallengeSlidePanelItem.NameInput
                        name={it().name}
                        onChangeName={(name) => handleChangeName(it().id, name)}
                      />
                    }
                    typeLabel={
                      <ChallengeSlidePanelItem.TypeLabel type={it().type} />
                    }
                    deleteButton={<ChallengeSlidePanelItem.DeleteButton />}
                    targetCountInput={
                      it().type !== 'complete' && (
                        <ChallengeSlidePanelItem.TargetCountInput
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
                      <ChallengeSlidePanelItem.DaySelect
                        day={it().day}
                        onChangeDay={(day) => handleChangeDay(it().id, day)}
                      />
                    }
                  />
                )}
              </Index>
            </div>

            <ChallengeSlidePanelDeleteButton />
          </div>

          <ChallengeSlidePanelSaveButton color={color()} />
        </>
      )}
    </SlidePanel>
  );
};
