import { Switch } from '@/components/ui/switch';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  shortcut?: string;
  title?: string;
}
export default function SwitchItem({
  disabled = false,
  className,
  shortcut,
  title,
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
      <span className="flex items-center text-sm">{title}</span>

      <span className="ml-auto mr-2 text-xs opacity-60">
        <kbd>{shortcut}</kbd>
      </span>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}
