import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "./DataTable";
import { useTreasuryStore } from "@/lib/store";
import { BankAccount } from "@shared/schema";
import { RefreshCw, University } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { generateSparklineData } from "@/lib/mockData";

export function BankBalanceTable() {
  const { bankAccounts, selectBankAccount } = useTreasuryStore();

  const handleRowClick = (account: BankAccount) => {
    selectBankAccount(account);
  };

  const columns: Column<BankAccount>[] = [
    {
      key: "bankName",
      header: "Bank",
      cell: (account) => (
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ backgroundColor: account.bankColor || '#6b7280' }}
          >
            <University className="text-white h-4 w-4" />
          </div>
          <div>
            <div className="font-medium text-foreground">{account.bankName}</div>
            <div className="text-xs text-muted-foreground">{account.accountNumber}</div>
          </div>
        </div>
      )
    },
    {
      key: "currency",
      header: "Currency",
      cell: (account) => (
        <span className="text-sm text-foreground">{account.currency}</span>
      )
    },
    {
      key: "ledgerBalance",
      header: "Balance",
      className: "text-right",
      cell: (account) => (
        <div className="text-right">
          <div className="font-medium text-foreground">
            {account.currency === 'USD' ? '$' : '€'}
            {account.ledgerBalance.toLocaleString()}
          </div>
          <div className="text-xs text-accent">
            +5.2%
          </div>
        </div>
      )
    },
    {
      key: "lastUpdated",
      header: "Trend",
      className: "text-center",
      cell: (account) => (
        <div className="w-16 h-8 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateSparklineData(10).map((value, index) => ({ value, index }))}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(160, 82%, 36%)" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )
    }
  ];

  const totalCashPosition = useMemo(() => {
    return bankAccounts.reduce((total, account) => {
      if (account.currency === 'USD') {
        return total + account.ledgerBalance;
      } else if (account.currency === 'EUR') {
        return total + (account.ledgerBalance * 1.08); // Simple conversion
      }
      return total;
    }, 0);
  }, [bankAccounts]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Cash Balances by Bank
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-foreground"
          data-testid="button-refresh-balances"
        >
          <RefreshCw className="mr-1 h-4 w-4" />
          Last updated: 2 mins ago
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          data={bankAccounts}
          columns={columns}
          onRowClick={handleRowClick}
          data-testid="table-bank-balances"
        />
        
        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
          <span>
            Total Cash Position: <strong className="text-foreground">
              ${totalCashPosition.toLocaleString()} USD
            </strong>
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
            data-testid="button-view-all-accounts"
          >
            View All Accounts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
