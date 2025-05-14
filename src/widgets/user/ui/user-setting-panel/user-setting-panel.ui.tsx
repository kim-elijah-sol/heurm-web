import { Component } from 'solid-js';
import { Panel, X } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const UserSettingPanel: Component<Props> = (props) => {
  return (
    <Panel.Slide close={props.close}>
      {(close) => (
        <div class='flex-1 flex flex-col'>
          <button
            onClick={close}
            class='p-[10px] rounded-[35%] transition-all bg-red-400 active:bg-red-500 active:scale-95 self-end'
          >
            <X size={24} />
          </button>
        </div>
      )}
    </Panel.Slide>
  );
};
