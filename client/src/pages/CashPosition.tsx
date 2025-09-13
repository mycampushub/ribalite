import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DataTable, Column } from "@/components/treasury/DataTable";
import { ChartContainer } from "@/components/treasury/ChartContainer";
import { EmptyState } from "@/components/treasury/EmptyState";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTreasuryStore } from "@/lib/store";
import { BankAccount } from "@shared/schema";
import { RefreshCw, University } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function CashPosition() {
  const { bankAccounts, selectBankAccount } = useTreasuryStore();
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [bankFilter, setBankFilter] = useState("all");

  const filteredAccounts = bankAccounts.filter(account => {
    if (currencyFilter !== "all" && account.currency !== currencyFilter) return false;
    if (bankFilter !== "all" && account.bankName !== bankFilter) return false;
    return true;
  });

  const balanceDistribution = bankAccounts.map(account => ({
    name: account.bankName,
    value: account.currency === 'USD' ? account.ledgerBalance : account.ledgerBalance * 1.08,
    color: account.bankColor || '#8884d8'
  }));

  const columns: Column<BankAccount>[] = [
    {
      key: "bankName",
      header: "Account",
      cell: (account) => (
        <div>
          <div className="font-medium text-foreground">{account.bankName}</div>
          <div className="text-xs text-muted-foreground">
            {account.currency} • {account.accountNumber}
          </div>
        </div>
      )
    },
    {
      key: "ledgerBalance",
      header: "Ledger Balance",
      className: "text-right",
      cell: (account) => (
        <span className="text-foreground font-medium">
          {account.currency === 'USD' ? '$' : '€'}
          {account.ledgerBalance.toLocaleString()}
        </span>
      )
    },
    {
      key: "availableBalance", 
      header: "Available",
      className: "text-right",
      cell: (account) => (
        <span className="text-foreground font-medium">
          {account.currency === 'USD' ? '$' : '€'}
          {account.availableBalance.toLocaleString()}
        </span>
      )
    },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      cell: (account) => (
        <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
          {account.status}
        </Badge>
      )
    }
  ];

  const handleRowClick = (account: BankAccount) => {
    selectBankAccount(account);
  };

  return (
    <AppLayout>
      <div className="h-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Cash Position</h2>
          <div className="flex items-center space-x-4">
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className="w-40" data-testid="select-currency-filter">
                <SelectValue placeholder="All Currencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Currencies</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={bankFilter} onValueChange={setBankFilter}>
              <SelectTrigger className="w-40" data-testid="select-bank-filter">
                <SelectValue placeholder="All Banks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Banks</SelectItem>
                {bankAccounts.map(account => (
                  <SelectItem key={account.id} value={account.bankName}>
                    {account.bankName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-refresh-positions"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Account Details Table */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Account Details</h3>
            {filteredAccounts.length > 0 ? (
              <div className="overflow-auto max-h-96">
                <DataTable
                  data={filteredAccounts}
                  columns={columns}
                  onRowClick={handleRowClick}
                />
              </div>
            ) : (
              <EmptyState
                icon={<University className="h-12 w-12" />}
                title="No accounts found"
                description="Try adjusting your filters to see more accounts."
              />
            )}
          </div>

          {/* Balance Distribution Chart */}
          <ChartContainer title="Balance Distribution">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={balanceDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {balanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>
      </div>
    </AppLayout>
  );
}
