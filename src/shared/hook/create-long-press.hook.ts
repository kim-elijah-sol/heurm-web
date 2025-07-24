type Props = {
  onClick: () => void;
  onLongPress: () => void;
};

export const createLongPress = (props: Props) => {
  let lastClicked: number;

  const handleEventStart = () => {
    lastClicked = Date.now();
  };

  const handleEventEnd = () => {
    if (Date.now() - lastClicked >= 300) {
      props.onLongPress();
    } else {
      props.onClick();
    }
  };

  return {
    onTouchStart: handleEventStart,
    onTouchEnd: handleEventEnd,
  };
};
