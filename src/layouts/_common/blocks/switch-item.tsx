import { Switch } from '@/components/ui/switch';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}
export default function SwitchItem({
  disabled = false,
  children,
  className,
}: Props) {
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
  };
  return (
    <div
      className={clsx(
        disabled && 'pointer-events-none opacity-50',
        'hover:bg-accent my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5',
        className
      )}
      onClick={() => handleClick()}
    >
      <span className="flex items-center text-sm">{children}</span>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}
