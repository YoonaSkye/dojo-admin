import { Switch } from '@/components/ui/switch';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
  defaultChecked?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  shortcut?: string;
  title?: string;
  callback?: (checked: boolean) => void;
}
export default function SwitchItem({
  defaultChecked = false,
  disabled = false,
  className,
  shortcut,
  title,
  callback,
}: Props) {
  const [checked, setChecked] = useState(defaultChecked);
  const handleClick = () => {
    setChecked(!checked);
    callback && callback(!checked);
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
