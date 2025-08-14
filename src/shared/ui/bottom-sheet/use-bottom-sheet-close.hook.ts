import { useContext } from 'solid-js';
import { BottomSheetCloseContext } from './bottom-sheet-close.context';

export const useBottomSheetClose = () => {
  const bottomSheetCloseContext = useContext(BottomSheetCloseContext);

  if (!bottomSheetCloseContext)
    throw new Error('Bottom Sheet Close Context is not exist');

  return bottomSheetCloseContext;
};
