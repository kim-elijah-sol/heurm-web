import { useContext } from 'solid-js';
import { FlowItemColorContext } from '../context';

export const useFlowItemColor = () => {
  const flowItemColorContext = useContext(FlowItemColorContext);

  if (!flowItemColorContext)
    throw new Error('Flow Item Color Context is not exist');

  const getColor = () => flowItemColorContext;

  return getColor;
};
