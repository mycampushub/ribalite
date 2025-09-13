import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand, Download } from "lucide-react";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onExpand?: () => void;
  onExport?: () => void;
  className?: string;
}

export function ChartContainer({ 
  title, 
  children, 
  actions, 
  onExpand, 
  onExport, 
  className 
}: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          {actions}
          {onExport && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              data-testid="button-export-chart"
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
          {onExpand && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onExpand}
              data-testid="button-expand-chart"
            >
              <Expand className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
