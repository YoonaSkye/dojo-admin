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

interface WorkbenchProjectItem {
  color?: string;
  content: string;
  date: string;
  group: string;
  icon: React.ReactNode | string;
  title: string;
}

interface WorkbenchTrendItem {
  avatar: string;
  content: string;
  date: string;
  title: string;
}

export type {
  AnalysisOverviewItem,
  TabOption,
  WorkbenchProjectItem,
  WorkbenchTrendItem,
};
