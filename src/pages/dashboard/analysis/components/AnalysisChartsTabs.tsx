import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabOption } from '../../typing';
import { cn } from '@/lib/utils';
import BaseChart from '@/echarts/BaseChart';
import { chartTabOptions } from '../config';

interface Props {
  tabs: TabOption[];
  children?: React.ReactNode;
  className?: string;
}

export default function AnalysisChartsTabs({
  tabs,
  children,
  className,
  ...props
}: Props) {
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
        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.label} className="pt-4">
            <BaseChart
              options={chartTabOptions[tab.value as 'trends' | 'visits']}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
