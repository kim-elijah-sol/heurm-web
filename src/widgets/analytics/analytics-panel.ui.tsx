import { type Accessor, type Component } from 'solid-js';
import {
  AnalyticsCard,
  AnalyticsChart,
  AnalyticsOverviewCard,
  AnalyticsPanelTop,
} from '~/features/analytics/ui';
import type { FlowColor } from '~/shared/types';
import { Panel } from '~/shared/ui';

type Props = {
  close: () => void;
  title: Accessor<string>;
  color: Accessor<FlowColor>;
  challengeItems: Accessor<any[]>;
};

export const AnalyticsPanel: Component<Props> = (props) => {
  return (
    <Panel.Slide close={props.close} class='pb-0'>
      {(close) => (
        <>
          <AnalyticsPanelTop title={props.title} close={close} />
          <div class='flex-1 overflow-y-auto overflow-x-visible flex flex-col items-center pb-4 pt-[60px]'>
            <div class='flex gap-3 w-full'>
              <AnalyticsOverviewCard title='🏆 Win!' color='green' count={15} />
              <AnalyticsOverviewCard title='😥 Lose' color='red' count={7} />
            </div>

            <div class='w-full min-h-[1px] bg-linear-to-r from-white via-slate-300 to-white my-8' />

            <div class='flex flex-col w-full gap-6'>
              {props.challengeItems().map((it) => (
                <AnalyticsCard
                  name={it.name}
                  type={it.type}
                  color={props.color()}
                  targetCount={it.type === 'complete' ? null : it.targetCount}
                >
                  {it.type === 'complete' && (
                    <AnalyticsChart.Complete
                      datas={[true, false, true, false, false, true, true]}
                    />
                  )}
                  {it.type === 'over' && (
                    <AnalyticsChart.Over
                      targetCount={it.targetCount}
                      datas={[190, 205, 185, 200, 205, 210, 205]}
                    />
                  )}
                  {it.type === 'under' && (
                    <AnalyticsChart.Under
                      targetCount={it.targetCount}
                      datas={[16, 18, 15, 17, 14.5, 14, 14.1]}
                    />
                  )}
                </AnalyticsCard>
              ))}
            </div>
          </div>
        </>
      )}
    </Panel.Slide>
  );
};
