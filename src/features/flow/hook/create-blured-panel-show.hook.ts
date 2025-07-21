import { flowConstant } from '~/entities/flow';
import { createDateSelect } from '~/features/main/hook';
import { getMidnight, getRandomItem } from '~/shared/fx';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';

export const createBluredPanelShow = () => {
  const { current } = createDateSelect();

  const [isBluredPanelShow, _open, close] = createBoolean();

  const open = () => {
    const today = getMidnight().valueOf();

    if (current().valueOf() > today) {
      toast.open(getRandomItem(flowConstant.NOT_ALLOW_RECORD_FUTURE));
    } else {
      _open();
    }
  };

  return [isBluredPanelShow, open, close] as const;
};
