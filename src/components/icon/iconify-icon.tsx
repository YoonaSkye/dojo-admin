import { Icon } from '@iconify/react';

import type { IconProps } from '@iconify/react';

interface Props extends IconProps {
  size?: IconProps['width'];
}
export default function Iconify({
  icon,
  size,
  className = '',
  ...other
}: Props) {
  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      className={className}
      {...other}
    />
  );
}
