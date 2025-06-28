export const Ban = ({
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
    class='lucide lucide-ban-icon lucide-ban'
  >
    <circle cx='12' cy='12' r='10' />
    <path d='m4.9 4.9 14.2 14.2' />
  </svg>
);
