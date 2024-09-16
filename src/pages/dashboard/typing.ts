interface AnalysisOverviewItem {
  icon: React.ReactNode | string;
  title: string;
  totalTitle: string;
  totalValue: number;
  value: number;
}

type TabOption = {
  label: string;
  value: string;
};

export type { AnalysisOverviewItem, TabOption };
