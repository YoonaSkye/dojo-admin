import { Iconify } from '@/components/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { WorkbenchQuickNavItem } from '../../typing';

interface Props {
  items: WorkbenchQuickNavItem[];
  title: string;
  className?: string;
}

export default function WorkbenchQuickNav({ items, title, className }: Props) {
  return (
    <Card className={className}>
      <CardHeader className="py-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap p-0">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              'flex-col-center group w-1/3 cursor-pointer border-r border-t border-border py-8 hover:shadow-xl',
              { 'border-r-0': index % 3 === 2 },
              { 'border-b-0': index < 3 },
              { 'pb-4': index > 2 },
              { 'rounded-bl-xl': index === items.length - 3 },
              { 'rounded-br-xl': index === items.length - 1 },
            )}
          >
            <Iconify
              icon={item.icon}
              color={item.color}
              className="size-7 transition-all duration-300 group-hover:scale-125"
            />
            <span className="text-md mt-2 truncate">{item.title}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
