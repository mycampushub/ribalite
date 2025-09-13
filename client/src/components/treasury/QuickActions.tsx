import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, TrendingUp, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function QuickActions() {
  const { toast } = useToast();

  const handleCreatePayment = () => {
    toast({
      title: "Create Payment",
      description: "Payment creation modal would open here",
    });
  };

  const handleUploadStatement = () => {
    toast({
      title: "Upload Statement",
      description: "File upload dialog would open here",
    });
  };

  const handleRunForecast = () => {
    toast({
      title: "Run Forecast",
      description: "Forecast generation started",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button
            onClick={handleCreatePayment}
            className="w-full justify-between bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-create-payment"
          >
            <span className="flex items-center">
              <Plus className="mr-3 h-4 w-4" />
              Create Payment
            </span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleUploadStatement}
            variant="secondary"
            className="w-full justify-between"
            data-testid="button-upload-statement"
          >
            <span className="flex items-center">
              <Upload className="mr-3 h-4 w-4" />
              Upload Bank Statement
            </span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleRunForecast}
            className="w-full justify-between bg-accent text-accent-foreground hover:bg-accent/90"
            data-testid="button-run-forecast"
          >
            <span className="flex items-center">
              <TrendingUp className="mr-3 h-4 w-4" />
              Run Forecast
            </span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
