import { AppLayout } from "@/components/layout/AppLayout";
import { QuickActions } from "@/components/treasury/QuickActions";
import { ActivityFeed } from "@/components/treasury/ActivityFeed";
import { BankBalanceTable } from "@/components/treasury/BankBalanceTable";
import { CashFlowChart } from "@/components/treasury/CashFlowChart";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="h-full p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Column A: Quick Actions & Recent Activity */}
          <div className="space-y-6">
            <QuickActions />
            <ActivityFeed />
          </div>

          {/* Column B: Cash Balances Table */}
          <div>
            <BankBalanceTable />
          </div>

          {/* Column C: Interactive Cash Chart */}
          <div>
            <CashFlowChart />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
