import { OnlySelecteableWaveItem } from './only-selectable-wave-item.ui';
import { WaveItem as _WaveItem } from './wave-item.ui';

export const WaveItem = Object.assign(_WaveItem, {
  OnlySelectable: OnlySelecteableWaveItem,
});
