export const getClientTouchPotision = (
  event: TouchEvent
): Record<'x' | 'y', number> => {
  const { clientX, clientY } = event.touches[0];

  return {
    x: clientX,
    y: clientY,
  };
};
