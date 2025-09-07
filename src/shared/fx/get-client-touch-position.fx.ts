export const getClientTouchPotision = (
  event: TouchEvent
): Record<'x' | 'y', number> => {
  if (!event?.touches || event.touches.length === 0) {
    throw new Error('No touches detected on the event.');
  }

  const { clientX, clientY } = event.touches[0];

  return {
    x: clientX,
    y: clientY,
  };
};
