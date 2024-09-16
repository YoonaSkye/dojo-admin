import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabOption } from '../typing';

interface Props {
  tabs: TabOption[];
  children: React.ReactNode;
}

export default function AnalysisChartsTabs({
  tabs,
  children,
  ...props
}: Props) {
  return (
    <div className="card-box w-full px-4 pb-5 pt-3">
      <Tabs defaultValue="trends" className="w-[400px]">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.value} key={tab.label}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.label} className="pt-4">
            Make changes to your account here. {tab.value}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
