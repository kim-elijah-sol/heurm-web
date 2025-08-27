import { type JSX } from 'solid-js';
import { getClientTouchPotision } from '../fx';

type Props = {
  onClick: () => void;
  onLongPress: () => void;
  threshold?: number;
};

type TouchEventHandler = JSX.EventHandlerWithOptionsUnion<
  HTMLElement,
  TouchEvent
>;

export const createLongPress = (props: Props) => {
  const threshold = props.threshold ?? 0;
  let lastClicked: number;
  let isCancel: boolean;
  let initialTouchPosition: Record<'x' | 'y', number> = { x: 0, y: 0 };

  const handleEventStart: TouchEventHandler = (event) => {
    lastClicked = Date.now();
    isCancel = false;

    const { x, y } = getClientTouchPotision(event);

    initialTouchPosition.x = x;
    initialTouchPosition.y = y;
  };

  const handleEventMove: TouchEventHandler = (event) => {
    const { x, y } = getClientTouchPotision(event);

    const deltaX = Math.abs(initialTouchPosition.x - x);
    const deltaY = Math.abs(initialTouchPosition.y - y);

    if (deltaX > threshold || deltaY > threshold) {
      isCancel = true;
    }
  };

  const handleEventEnd: TouchEventHandler = () => {
    if (isCancel) {
      return;
    }

    if (Date.now() - lastClicked >= 300) {
      props.onLongPress();
    } else {
      props.onClick();
    }
  };

  return {
    onTouchStart: handleEventStart,
    onTouchEnd: handleEventEnd,
    onTouchMove: handleEventMove,
  };
};
