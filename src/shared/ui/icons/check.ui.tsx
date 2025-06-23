export const Check = ({
  size = 36,
  strokeWidth = 2,
  stroke = '#FFFFFF',
}: {
  size?: number;
  strokeWidth?: number;
  stroke?: string;
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={stroke}
    stroke-width={strokeWidth}
    stroke-linecap='round'
    stroke-linejoin='round'
    class='lucide lucide-check-icon lucide-check'
  >
    <path d='M20 6 9 17l-5-5' />
  </svg>
);
