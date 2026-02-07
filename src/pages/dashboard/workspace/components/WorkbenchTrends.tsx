import { Iconify } from '@/components/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { WorkbenchTrendItem } from '../../typing';

interface Props {
  items: WorkbenchTrendItem[];
  title: string;
  className?: string;
}

export default function WorkbenchTrends({ items, title, className }: Props) {
  return (
    <Card className={className}>
      <CardHeader className="py-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap p-5 pt-0">
        <ul className="w-full divide-y divide-border" role="list">
          {items.map((item, index) => (
            <li
              key={`${item.title}-${index}`}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 items-center gap-x-4">
                <Iconify
                  icon={item.avatar}
                  className="size-10 flex-none rounded-full"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-foreground">
                    {item.title}
                  </p>

                  <p
                    className="mt-1 truncate text-xs leading-5 text-foreground/80 *:text-primary"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></p>
                </div>
              </div>
              <div className="hidden h-full shrink-0 sm:flex sm:flex-col sm:items-end">
                <span className="mt-6 text-xs leading-6 text-foreground/80">
                  {item.date}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
