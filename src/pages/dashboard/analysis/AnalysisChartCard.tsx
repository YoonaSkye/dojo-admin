import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalysisChartCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export default function AnalysisChartCard({
  title,
  children,
  className,
}: AnalysisChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
