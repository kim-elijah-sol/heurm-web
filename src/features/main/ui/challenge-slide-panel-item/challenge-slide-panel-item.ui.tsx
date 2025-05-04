import clsx from 'clsx';
import { Accessor, children, JSX } from 'solid-js';
import { ChallengeColor, CHALLENGE_100_BG_COLOR } from '~/entities/main';
import { ChallengeItemColorContext } from '../../context';

type Props = {
  color: Accessor<ChallengeColor>;
  nameInput: JSX.Element;
  typeLabel: JSX.Element;
  deleteButton: JSX.Element;
  targetCountInput?: JSX.Element;
  daySelect: JSX.Element;
};

export const ChallengeSlidePanelItem = (props: Props) => {
  return (
    <ChallengeItemColorContext.Provider value={props.color}>
      <div
        class={clsx(
          'flex flex-col rounded-[12px] p-3',
          CHALLENGE_100_BG_COLOR[props.color()]
        )}
      >
        <div class='flex items-start justify-between mb-4'>
          <div class='flex flex-col gap-1 pl-1'>
            {children(() => props.nameInput)()}

            {children(() => props.typeLabel)()}
          </div>
          {children(() => props.deleteButton)()}
        </div>
        {props.targetCountInput
          ? children(() => props.targetCountInput)()
          : null}
        {children(() => props.daySelect)()}
      </div>
    </ChallengeItemColorContext.Provider>
  );
};
