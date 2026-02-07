import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';

const items = [
  { label: '0', value: '0' },
  { label: '0.25', value: '0.25' },
  { label: '0.5', value: '0.5' },
  { label: '0.75', value: '0.75' },
  { label: '1', value: '1' },
];

export function Radius() {
  const [modelValue, setModelValue] = useState<string | undefined>('0.5');
  return (
    <ToggleGroup
      defaultValue={modelValue}
      onValueChange={setModelValue}
      type="single"
      size="sm"
      variant="outline"
      className="gap-2"
    >
      {items.map((item) => (
        <ToggleGroupItem
          value={item.value}
          key={item.value}
          className="h-7 w-16 rounded-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
