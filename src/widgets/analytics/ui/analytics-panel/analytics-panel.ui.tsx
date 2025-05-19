import { Accessor, Component } from 'solid-js';
import { AnalyticsPanelTop } from '~/features/analytics/ui';
import { ChallengeColor, ChallengeItem } from '~/shared/model';
import { Panel } from '~/shared/ui';

type Props = {
  close: () => void;
  title: Accessor<string>;
  color: Accessor<ChallengeColor>;
  challengeItems: Accessor<ChallengeItem[]>;
};

export const AnalyticsPanel: Component<Props> = (props) => {
  return (
    <Panel.Slide close={props.close}>
      {(close) => (
        <>
          <AnalyticsPanelTop title={props.title} close={close} />
          <div class='flex-1 overflow-y-auto flex flex-col items-center pb-20 pt-[60px]'></div>
        </>
      )}
    </Panel.Slide>
  );
};
