import clsx from 'clsx';

export const ChevronsUp = ({
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
    class={clsx('lucide lucide-chevrons-up-icon lucide-chevrons-up', className)}
  >
    <path d='m17 11-5-5-5 5' />
    <path d='m17 18-5-5-5 5' />
  </svg>
);
