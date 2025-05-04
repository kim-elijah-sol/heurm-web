import { createSignal, Index } from 'solid-js';
import {
  ChallengeItemType,
  CHALLENGE_COLOR,
  CountableChallengeItemType,
} from '~/entities/main';
import {
  ChallengeColorSelect,
  ChallengeSlidePanelCompleteItem,
  ChallengeSlidePanelCountableItem,
  ChallengeSlidePanelDeleteButton,
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

          <div class='flex-1 overflow-y-auto flex flex-col items-center pb-20'>
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
              <Index each={challengeItems()}>
                {(it) =>
                  it().type === 'complete' ? (
                    <ChallengeSlidePanelCompleteItem
                      name={it().name}
                      onChangeName={(name) => handleChangeName(it().id, name)}
                      day={it().day}
                      onChangeDay={(day) => handleChangeDay(it().id, day)}
                      color={color()}
                    />
                  ) : (
                    <ChallengeSlidePanelCountableItem
                      type={(it() as CountableChallengeItemType).type}
                      name={it().name}
                      onChangeName={(name) => handleChangeName(it().id, name)}
                      day={it().day}
                      onChangeDay={(day) => handleChangeDay(it().id, day)}
                      targetCount={
                        (it() as CountableChallengeItemType).targetCount
                      }
                      onChangeTargetColor={(targetCount) =>
                        handleChangeTargetCount(it().id, targetCount)
                      }
                      color={color()}
                    />
                  )
                }
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
