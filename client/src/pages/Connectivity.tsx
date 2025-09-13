import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTreasuryStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import { Plus, TestTube, Settings, Activity } from "lucide-react";

export default function Connectivity() {
  const { connectors } = useTreasuryStore();

  const getStatusBadge = (status: string) => {
    const config = {
      connected: { variant: 'default' as const, label: 'Connected' },
      pending: { variant: 'secondary' as const, label: 'Pending' },
      error: { variant: 'destructive' as const, label: 'Error' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' },
    };

    const statusConfig = config[status as keyof typeof config];
    return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      bank: '🏦',
      erp: '📊',
      accounting: '💼'
    };
    return icons[type as keyof typeof icons] || '🔗';
  };

  return (
    <AppLayout>
      <div className="h-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Connectivity</h2>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-add-connection"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Connection
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {connectors.map((connector) => (
            <Card key={connector.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(connector.type)}</span>
                    <CardTitle className="font-semibold text-foreground">
                      {connector.name}
                    </CardTitle>
                  </div>
                  {getStatusBadge(connector.status)}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {connector.lastSync && (
                      <div>
                        Last sync: {formatDistanceToNow(connector.lastSync, { addSuffix: true })}
                      </div>
                    )}
                    
                    {connector.apiKey && (
                      <div>API Key: {connector.apiKey}</div>
                    )}
                    
                    {connector.rateLimit && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Rate limit usage</span>
                          <span>{connector.rateLimitUsed || 0}/{connector.rateLimit}</span>
                        </div>
                        <Progress 
                          value={(connector.rateLimitUsed || 0) / connector.rateLimit * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {connector.status === 'pending' && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Setup Progress</div>
                        <Progress value={75} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          75% complete - OAuth2 pending
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    {connector.status === 'connected' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          data-testid={`button-test-${connector.id}`}
                        >
                          <TestTube className="mr-1 h-3 w-3" />
                          Test
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          data-testid={`button-configure-${connector.id}`}
                        >
                          <Settings className="mr-1 h-3 w-3" />
                          Configure
                        </Button>
                      </>
                    )}
                    
                    {connector.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="bg-primary text-primary-foreground"
                        data-testid={`button-complete-setup-${connector.id}`}
                      >
                        Complete Setup
                      </Button>
                    )}
                    
                    {connector.status === 'error' && (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        data-testid={`button-retry-${connector.id}`}
                      >
                        Retry Connection
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="ghost"
                      data-testid={`button-logs-${connector.id}`}
                    >
                      <Activity className="mr-1 h-3 w-3" />
                      Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connection Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {connectors.filter(c => c.status === 'connected').length}
                </div>
                <div className="text-sm text-muted-foreground">Active Connections</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {connectors.filter(c => c.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending Setup</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime (30d)</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {connectors.reduce((acc, c) => acc + (c.rateLimitUsed || 0), 0)}
                </div>
                <div className="text-sm text-muted-foreground">API Calls Today</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
