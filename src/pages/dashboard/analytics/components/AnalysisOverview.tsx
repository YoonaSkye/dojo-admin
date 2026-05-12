import { CountTo } from '@/components/count-to';
import { Iconify } from '@/components/icon';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { AnalysisOverviewItem } from '../../typing';

interface AnalysisOverviewProps {
  items: AnalysisOverviewItem[];
}
export default function AnalysisOverview({ items }: AnalysisOverviewProps) {
  return (
    <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <Card className="w-full" key={item.title}>
          <CardHeader>
            <CardTitle className="text-xl">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <CountTo endVal={item.value} duration={1500} className="text-xl" />
            <Iconify icon={item.icon} className="size-8 flex-shrink-0" />
          </CardContent>
          <CardFooter className="justify-between">
            <span>{item.totalTitle}</span>

            <CountTo endVal={item.totalValue} duration={1500} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
