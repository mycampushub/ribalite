import { AppLayout } from "@/components/layout/AppLayout";
import { ChartContainer } from "@/components/treasury/ChartContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTreasuryStore } from "@/lib/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function RiskManagement() {
  const { fxExposures } = useTreasuryStore();

  // Mock FX exposure data for the chart
  const fxChartData = [
    { pair: 'USD/EUR', exposure: 1.2, hedged: 0.9, unhedged: 0.3 },
    { pair: 'USD/GBP', exposure: 0.8, hedged: 0.5, unhedged: 0.3 },
    { pair: 'USD/JPY', exposure: 150, hedged: 100, unhedged: 50 }, // in millions
    { pair: 'USD/CAD', exposure: 1.1, hedged: 0.7, unhedged: 0.4 },
    { pair: 'USD/AUD', exposure: 0.6, hedged: 0.3, unhedged: 0.3 }
  ];

  const formatYAxis = (value: number, pair: string) => {
    return pair === 'USD/JPY' ? `¥${value}M` : `$${value}M`;
  };

  const hedgeRecommendations = [
    {
      id: 1,
      pair: 'EUR/USD',
      exposure: 1200000,
      recommendation: 'Hedge €1.2M exposure with 3-month forward contract at 1.0850',
      riskLevel: 'medium',
      confidence: 85
    },
    {
      id: 2,
      pair: 'GBP/USD', 
      exposure: 800000,
      recommendation: 'Consider options collar to protect against downside while maintaining upside',
      riskLevel: 'low',
      confidence: 72
    }
  ];

  const getRiskBadge = (level: string) => {
    const config = {
      low: { variant: 'default' as const, label: 'Low Risk' },
      medium: { variant: 'secondary' as const, label: 'Medium Risk' },
      high: { variant: 'destructive' as const, label: 'High Risk' },
    };
    
    const risk = config[level as keyof typeof config];
    return <Badge variant={risk.variant}>{risk.label}</Badge>;
  };

  return (
    <AppLayout>
      <div className="h-full p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Risk Management</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FX Exposures Chart */}
          <ChartContainer title="FX Exposures">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fxChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="pair" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value}M`}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `$${value}M`, 
                      name === 'hedged' ? 'Hedged' : name === 'unhedged' ? 'Unhedged' : 'Total Exposure'
                    ]}
                  />
                  <Bar 
                    dataKey="hedged" 
                    stackId="a"
                    fill="hsl(var(--chart-2))" 
                    name="Hedged"
                  />
                  <Bar 
                    dataKey="unhedged" 
                    stackId="a"
                    fill="hsl(var(--chart-4))" 
                    name="Unhedged"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Hedge Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Hedge Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hedgeRecommendations.map((rec) => (
                  <div key={rec.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{rec.pair} Hedge</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                          {rec.confidence}% Confidence
                        </span>
                        {getRiskBadge(rec.riskLevel)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {rec.recommendation}
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-primary text-primary-foreground"
                        data-testid={`button-accept-${rec.id}`}
                      >
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        data-testid={`button-modify-${rec.id}`}
                      >
                        Modify
                      </Button>
                    </div>
                  </div>
                ))}
                
                {hedgeRecommendations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No hedge recommendations at this time</p>
                    <p className="text-xs mt-1">Current exposures are within acceptable risk parameters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Metrics Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">$3.8M</div>
                <div className="text-sm text-muted-foreground">Total FX Exposure</div>
                <div className="text-xs text-destructive mt-1">+15% vs last month</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">68%</div>
                <div className="text-sm text-muted-foreground">Hedge Ratio</div>
                <div className="text-xs text-accent mt-1">Within target range</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2.3%</div>
                <div className="text-sm text-muted-foreground">VaR (95%, 1-day)</div>
                <div className="text-xs text-muted-foreground mt-1">$148k potential loss</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
