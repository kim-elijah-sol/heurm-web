import { ChallengeEditItem as _ChallengeEditItem } from './challenge-edit-item.ui';
import { DaySelect } from './day-select.ui';
import { DeleteButton } from './delete-button.ui';
import { NameInput } from './name-input.ui';
import { TargetCountInput } from './target-count-input.ui';
import { TypeLabel } from './type-label.ui';

export const ChallengeEditItem = Object.assign(_ChallengeEditItem, {
  NameInput,
  TypeLabel,
  DeleteButton,
  DaySelect,
  TargetCountInput,
});
