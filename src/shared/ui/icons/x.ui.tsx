export const X = ({
  size = 30,
  stroke = '#FFFFFF',
  strokeWidth = 2,
  className,
}: {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
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
    class={className}
  >
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </svg>
);
