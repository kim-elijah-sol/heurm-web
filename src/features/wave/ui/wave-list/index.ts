import { ScrollableWaveList } from './scrollable-wave-list.ui';
import { WaveList as _WaveList } from './wave-list.ui';

export const WaveList = Object.assign(_WaveList, {
  Scrollable: ScrollableWaveList,
});
