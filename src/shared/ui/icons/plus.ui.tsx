import clsx from 'clsx';

export const Plus = ({
  size = 24,
  stroke = '#FFFFFF',
  strokwWidth = 2,
  className,
}: {
  size?: number;
  stroke?: string;
  strokwWidth?: number;
  className?: string;
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={stroke}
    stroke-width={strokwWidth}
    stroke-linecap='round'
    stroke-linejoin='round'
    class={clsx('lucide lucide-plus-icon lucide-plus', className)}
  >
    <path d='M5 12h14' />
    <path d='M12 5v14' />
  </svg>
);
