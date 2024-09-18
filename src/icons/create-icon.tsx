import { Icon } from '@iconify/react';

function createIconifyIcon(icon: string) {
  return () => <Icon icon={icon} />;
}

export { createIconifyIcon };
