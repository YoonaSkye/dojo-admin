import { useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface Props {
  defaultChecked?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  shortcut?: string;
  title?: string;
  tip?: string;
  onCheckedChange?: (checked: boolean) => void;
}
export default function SwitchItem({
  defaultChecked = false,
  disabled = false,
  className,
  shortcut,
  title,
  tip,
  onCheckedChange,
}: Props) {
  const [checked, setChecked] = useState(defaultChecked);
  const handleClick = () => {
    setChecked(!checked);
    onCheckedChange?.(!checked);
  };
  return (
    <div
      className={cn(
        'my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5 hover:bg-accent',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      onClick={() => handleClick()}
    >
      <span className="flex items-center text-sm">{title}</span>
      {tip && <span className="ml-2 mr-auto text-xs opacity-60">{tip}</span>}

      {shortcut && (
        <span className="ml-auto mr-2 text-xs opacity-60">
          <kbd>{shortcut}</kbd>
        </span>
      )}
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}
