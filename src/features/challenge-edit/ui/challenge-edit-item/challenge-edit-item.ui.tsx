import clsx from 'clsx';
import { children, type Accessor, type Component, type JSX } from 'solid-js';
import { ChallengeEditContext } from '~/entities/challenge-edit';
import { CHALLENGE_100_BG_COLOR } from '~/shared/constant';
import type { ChallengeColor } from '~/shared/types';

type Props = {
  color: Accessor<ChallengeColor>;
  nameInput: JSX.Element;
  typeLabel: JSX.Element;
  deleteButton: JSX.Element;
  targetCountInput?: JSX.Element;
  unitInput?: JSX.Element;
  daySelect: JSX.Element;
};

export const ChallengeEditItem: Component<Props> = (props) => {
  return (
    <ChallengeEditContext.ChallengeItemColorContext.Provider
      value={props.color}
    >
      <div
        class={clsx(
          'flex flex-col rounded-[12px] p-3 transition-all',
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
        {props.targetCountInput || props.unitInput ? (
          <div class='mb-6 flex gap-2'>
            {props.targetCountInput
              ? children(() => props.targetCountInput)()
              : null}
            {props.unitInput ? children(() => props.unitInput)() : null}
          </div>
        ) : null}
        {children(() => props.daySelect)()}
      </div>
    </ChallengeEditContext.ChallengeItemColorContext.Provider>
  );
};
