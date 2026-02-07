import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { WorkbenchProjectItem } from '../../typing';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/icon';

interface Props {
  items: WorkbenchProjectItem[];
  title: string;
}

export default function WorkbenchProject({ items, title }: Props) {
  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap p-0">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={cn(
              'group w-full cursor-pointer border-r border-t border-border p-4 transition-all hover:shadow-xl md:w-1/2 lg:w-1/3',
              { 'border-r-0': index % 3 === 2 },
              { 'border-b-0': index < 3 },
              { 'pb-4': index > 2 },
            )}
          >
            <div className="flex items-center">
              <Iconify
                icon={item.icon}
                color={item.color}
                className="size-8 transition-all duration-300 group-hover:scale-110"
              />
              <span className="ml-4 text-lg font-medium">{item.title}</span>
            </div>
            <div className="mt-4 flex h-10 text-foreground/80">
              {item.content}
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>{item.group}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
