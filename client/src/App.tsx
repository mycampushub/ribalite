import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import CashPosition from "@/pages/CashPosition";
import CashForecasting from "@/pages/CashForecasting";
import Payments from "@/pages/Payments";
import RiskManagement from "@/pages/RiskManagement";
import Connectivity from "@/pages/Connectivity";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/cash-position" component={CashPosition} />
      <Route path="/forecasting" component={CashForecasting} />
      <Route path="/payments" component={Payments} />
      <Route path="/risk" component={RiskManagement} />
      <Route path="/connectivity" component={Connectivity} />
      <Route path="/settings" component={Settings} />
      <Route path="/support" component={() => <div>Support page coming soon</div>} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
