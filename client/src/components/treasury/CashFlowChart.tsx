import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./ChartContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateCashFlowData } from "@/lib/mockData";

export function CashFlowChart() {
  const [timeRange, setTimeRange] = useState("30");
  
  const chartData = useMemo(() => {
    const months = timeRange === "30" ? 12 : timeRange === "90" ? 12 : 24;
    const { labels, data } = generateCashFlowData(months);
    
    return labels.map((label, index) => ({
      month: label,
      balance: data[index],
      inflows: Math.round(data[index] * 0.4),
      outflows: Math.round(data[index] * 0.3)
    }));
  }, [timeRange]);

  const formatYAxis = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="bg-card border border-border rounded-lg p-3 shadow-lg z-50"
          role="tooltip"
          data-testid="chart-tooltip"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-foreground" data-testid="tooltip-label">
            {label}
          </p>
          <p className="text-sm text-primary" data-testid="tooltip-value">
            Balance: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer
      title="Cash Flow Trends"
      actions={
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40" data-testid="select-time-range">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      <div className="h-80" data-testid="cash-flow-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            data-testid="cash-flow-chart"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-foreground">$2.4M</div>
          <div className="text-sm text-muted-foreground">Total Inflows</div>
          <div className="text-xs text-accent">+12.5% vs last month</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">$1.8M</div>
          <div className="text-sm text-muted-foreground">Total Outflows</div>
          <div className="text-xs text-destructive">+8.2% vs last month</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">$6.5M</div>
          <div className="text-sm text-muted-foreground">Net Position</div>
          <div className="text-xs text-accent">+5.1% vs last month</div>
        </div>
      </div>
    </ChartContainer>
  );
}
