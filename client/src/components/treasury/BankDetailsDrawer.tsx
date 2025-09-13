import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTreasuryStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import { X, University } from "lucide-react";

export function BankDetailsDrawer() {
  const { selectedBankAccount, selectBankAccount, transactions } = useTreasuryStore();

  const accountTransactions = transactions.filter(
    (tx) => tx.accountId === selectedBankAccount?.id
  );

  if (!selectedBankAccount) return null;

  return (
    <Sheet open={!!selectedBankAccount} onOpenChange={() => selectBankAccount(null)}>
      <SheetContent className="w-96" data-testid="drawer-bank-details">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-lg font-semibold text-foreground">
            Bank Account Details
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="sm" data-testid="button-close-drawer">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Account Summary */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Account Summary</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank:</span>
                <span className="font-medium text-foreground">
                  {selectedBankAccount.bankName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account:</span>
                <span className="font-medium text-foreground">
                  {selectedBankAccount.accountNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency:</span>
                <span className="font-medium text-foreground">
                  {selectedBankAccount.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ledger Balance:</span>
                <span className="font-medium text-foreground">
                  {selectedBankAccount.currency === 'USD' ? '$' : '€'}
                  {selectedBankAccount.ledgerBalance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Balance:</span>
                <span className="font-medium text-foreground">
                  {selectedBankAccount.currency === 'USD' ? '$' : '€'}
                  {selectedBankAccount.availableBalance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={selectedBankAccount.status === 'active' ? 'default' : 'secondary'}>
                  {selectedBankAccount.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Recent Transactions */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recent Transactions</h4>
            <div className="space-y-3">
              {accountTransactions.length > 0 ? (
                accountTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex justify-between items-center p-3 bg-muted rounded-md"
                    data-testid={`transaction-${transaction.id}`}
                  >
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(transaction.date, { addSuffix: true })}
                      </div>
                    </div>
                    <div className={`font-medium ${
                      transaction.amount >= 0 ? 'text-accent' : 'text-destructive'
                    }`}>
                      {transaction.amount >= 0 ? '+' : ''}
                      ${Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <University className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent transactions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
