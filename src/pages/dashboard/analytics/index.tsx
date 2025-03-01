import type { AnalysisOverviewItem, TabOption } from '../typing';
import AnalysisChartCard from './components/AnalysisChartCard';
import AnalysisChartsTabs from './components/AnalysisChartsTabs';
import AnalysisOverview from './components/AnalysisOverview';

import AnalyticsVisitsData from './components/AnalyticsVisitsData';
import AnalyticsVisitsSales from './components/AnalyticsVisitsSales';
import AnalyticsVisitsSource from './components/AnalyticsVisitsSource';

const overviewItems: AnalysisOverviewItem[] = [
  {
    // icon: SvgCardIcon,
    icon: 'svg:card',
    title: '用户量',
    totalTitle: '总用户量',
    totalValue: 120_000,
    value: 2000,
  },
  {
    // icon: SvgCakeIcon,
    icon: 'svg:cake',
    title: '访问量',
    totalTitle: '总访问量',
    totalValue: 500_000,
    value: 20_000,
  },
  {
    // icon: SvgDownloadIcon,
    icon: 'svg:download',
    title: '下载量',
    totalTitle: '总下载量',
    totalValue: 120_000,
    value: 8000,
  },
  {
    // icon: SvgBellIcon,
    icon: 'svg:bell',
    title: '使用量',
    totalTitle: '总使用量',
    totalValue: 50_000,
    value: 5000,
  },
];

const chartTabs: TabOption[] = [
  {
    label: '流量趋势',
    value: 'trends',
  },
  {
    label: '月访问量',
    value: 'visits',
  },
];

export default function Analysis() {
  return (
    <div className="overflow-hidden">
      <AnalysisOverview items={overviewItems} />
      <AnalysisChartsTabs tabs={chartTabs} className="mt-5" />

      <div className="mt-5 w-full md:flex">
        <AnalysisChartCard
          className="mt-5 md:mr-4 md:mt-0 md:w-1/3"
          title="访问数量"
        >
          <AnalyticsVisitsData />
        </AnalysisChartCard>
        <AnalysisChartCard
          className="mt-5 md:mr-4 md:mt-0 md:w-1/3"
          title="访问来源"
        >
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
        <AnalysisChartCard className="mt-5 md:mt-0 md:w-1/3" title="访问来源">
          <AnalyticsVisitsSales />
        </AnalysisChartCard>
      </div>
    </div>
  );
}
