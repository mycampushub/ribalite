import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useTreasuryStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import { 
  CheckCircle, 
  RefreshCw, 
  AlertTriangle, 
  TrendingUp,
  User
} from "lucide-react";

const iconMap = {
  check: CheckCircle,
  sync: RefreshCw,
  "exclamation-triangle": AlertTriangle,
  "chart-line": TrendingUp,
  user: User,
};

export function ActivityFeed() {
  const activities = useTreasuryStore((state) => state.activities);

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || CheckCircle;
    return Icon;
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-96">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getIcon(activity.icon);
              
              return (
                <div 
                  key={activity.id} 
                  className="flex items-start space-x-3 p-3 hover:bg-muted rounded-md transition-colors"
                  data-testid={`activity-${activity.id}`}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: activity.iconColor }}
                  >
                    <Icon className="text-white h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
