import clsx from 'clsx';

export const CheckCheck = ({
  size = 36,
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
    class={clsx('lucide lucide-check-check-icon lucide-check-check', className)}
  >
    <path d='M18 6 7 17l-5-5' />
    <path d='m22 10-7.5 7.5L13 16' />
  </svg>
);
