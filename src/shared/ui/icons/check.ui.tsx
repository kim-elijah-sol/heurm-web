export const Check = ({
  size = 36,
  strokeWidth = 2,
}: {
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='#FFFFFF'
    stroke-width={strokeWidth}
    stroke-linecap='round'
    stroke-linejoin='round'
    class='lucide lucide-check-icon lucide-check'
  >
    <path d='M20 6 9 17l-5-5' />
  </svg>
);
