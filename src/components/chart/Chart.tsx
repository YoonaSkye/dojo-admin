import { memo } from 'react';
import ApexChart from 'react-apexcharts';

import type { Props as ApexChartProps } from 'react-apexcharts';

const Chart = memo((props: ApexChartProps) => {
  return <ApexChart {...props} />;
});

export default Chart;
