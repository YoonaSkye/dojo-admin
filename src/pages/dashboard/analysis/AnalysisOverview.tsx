import { AnalysisOverviewItem } from '../typing';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface AnalysisOverviewProps {
  items: AnalysisOverviewItem[];
}
export default function AnalysisOverview({ items }: AnalysisOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-col-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card className="w-full" key={item.title}>
          <CardHeader>
            <CardTitle className="text-xl">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="justify-between">
            <span>{item.totalTitle}</span>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
