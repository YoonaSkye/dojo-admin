import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { TabOption } from '../../typing';
import AnalyticsTrends from './AnalyticsTrends';
import AnalyticsVisits from './AnalyticsVisits';

interface Props {
  tabs: TabOption[];
  children?: React.ReactNode;
  className?: string;
}

export default function AnalysisChartsTabs({ tabs, className }: Props) {
  return (
    /**有一个bug 图表在浏览器页面较大时展示，在浏览器页面缩小后，图表不会大小自适应，会出现水平滚轴 */
    <div className={cn('card-box w-full px-4 pb-5 pt-3', className)}>
      <Tabs defaultValue="trends">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.value} key={tab.label}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="trends">
          <AnalyticsTrends />
        </TabsContent>
        <TabsContent value="visits">
          <AnalyticsVisits />
        </TabsContent>
      </Tabs>
    </div>
  );
}
