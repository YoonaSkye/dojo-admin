import { Icon } from '@iconify/react';

function createIconifyIcon(icon: string) {
  return (props: any) => <Icon icon={icon} {...props} />;
}

export { createIconifyIcon };
