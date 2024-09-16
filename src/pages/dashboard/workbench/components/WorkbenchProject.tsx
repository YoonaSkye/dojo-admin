import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkbenchProjectItem } from '../../typing';
import { cn } from '@/lib/utils';

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
              { 'border-r-0': index % 3 === 2 },
              { 'border-b-0': index < 3 },
              { 'pb-4': index > 2 },
              'border-border group w-full cursor-pointer border-b border-r border-t p-4 transition-all hover:shadow-xl md:w-1/2 lg:w-1/3'
            )}
          >
            <div className="flex items-center">
              icon
              <span className="ml-4 text-lg font-medium">{item.title}</span>
            </div>
            <div className="text-foreground/80 mt-4 flex h-10">
              {item.content}
            </div>
            <div className="text-foreground/80 flex justify-between">
              <span>{item.group}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
