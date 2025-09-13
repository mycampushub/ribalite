import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChartContainer } from "@/components/treasury/ChartContainer";
import { ScenarioModal } from "@/components/treasury/ScenarioModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function CashForecasting() {
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [inflowsAdjustment, setInflowsAdjustment] = useState([0]);
  const [outflowsAdjustment, setOutflowsAdjustment] = useState([0]);

  // Mock forecast data
  const forecastData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' });
    const baseValue = 6500000 + (i * 100000);
    const optimisticValue = baseValue * 1.2;
    const conservativeValue = baseValue * 0.85;
    
    return {
      month,
      baseline: baseValue,
      optimistic: optimisticValue,
      conservative: conservativeValue
    };
  });

  const formatYAxis = (value: number) => `$${(value / 1000000).toFixed(1)}M`;

  const calculateImpact = () => {
    const inflowsChange = inflowsAdjustment[0];
    const outflowsChange = outflowsAdjustment[0];
    
    const basePosition = 6500000;
    const monthlyInflows = 2400000;
    const monthlyOutflows = 1800000;
    
    const adjustedInflows = monthlyInflows * (1 + inflowsChange / 100);
    const adjustedOutflows = monthlyOutflows * (1 + outflowsChange / 100);
    const netChange = (adjustedInflows - adjustedOutflows) - (monthlyInflows - monthlyOutflows);
    
    const newPosition = basePosition + netChange;
    const cashDays = Math.floor(newPosition / (adjustedOutflows / 30));
    
    return { netChange, cashDays };
  };

  const { netChange, cashDays } = calculateImpact();

  return (
    <AppLayout>
      <div className="h-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Cash Forecasting</h2>
          <Button 
            onClick={() => setShowScenarioModal(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-new-scenario"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Scenario
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Forecast Chart */}
          <div className="lg:col-span-2">
            <ChartContainer title="Forecast Scenarios">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
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
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `$${value.toLocaleString()}`, 
                        name.charAt(0).toUpperCase() + name.slice(1)
                      ]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="baseline"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Baseline"
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="optimistic"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="Optimistic"
                    />
                    <Line
                      type="monotone"
                      dataKey="conservative"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={2}
                      name="Conservative"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </div>

          {/* What-if Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                What-if Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Inflows Adjustment
                  </Label>
                  <Slider
                    value={inflowsAdjustment}
                    onValueChange={setInflowsAdjustment}
                    max={50}
                    min={-50}
                    step={5}
                    className="w-full"
                    data-testid="slider-inflows"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>-50%</span>
                    <span className="font-medium text-foreground">
                      {inflowsAdjustment[0] > 0 ? '+' : ''}{inflowsAdjustment[0]}%
                    </span>
                    <span>+50%</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Outflows Adjustment
                  </Label>
                  <Slider
                    value={outflowsAdjustment}
                    onValueChange={setOutflowsAdjustment}
                    max={50}
                    min={-50}
                    step={5}
                    className="w-full"
                    data-testid="slider-outflows"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>-50%</span>
                    <span className="font-medium text-foreground">
                      {outflowsAdjustment[0] > 0 ? '+' : ''}{outflowsAdjustment[0]}%
                    </span>
                    <span>+50%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-4">Impact Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cash Position Change:</span>
                      <span 
                        className={`font-medium ${
                          netChange >= 0 ? 'text-accent' : 'text-destructive'
                        }`}
                        data-testid="text-position-change"
                      >
                        {netChange >= 0 ? '+' : ''}${Math.abs(netChange).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Days Cash on Hand:</span>
                      <span className="font-medium text-foreground" data-testid="text-cash-days">
                        {cashDays} days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ScenarioModal
          open={showScenarioModal}
          onClose={() => setShowScenarioModal(false)}
        />
      </div>
    </AppLayout>
  );
}
