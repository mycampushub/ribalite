import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DataTable, Column } from "@/components/treasury/DataTable";
import { PaymentDetailsModal } from "@/components/treasury/PaymentDetailsModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTreasuryStore } from "@/lib/store";
import { Payment } from "@shared/schema";
import { Plus, Eye, CheckCircle, Ban, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Payments() {
  const { payments, approvePayment, rejectPayment } = useTreasuryStore();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = payments.filter(payment => {
    if (statusFilter === "all") return true;
    return payment.status === statusFilter;
  });

  const getStatusBadge = (status: Payment['status'], fraudAlert: boolean) => {
    const statusConfig = {
      draft: { variant: 'secondary' as const, label: 'Draft' },
      pending_approval: { variant: 'default' as const, label: 'Pending' },
      approved: { variant: 'default' as const, label: 'Approved' },
      sent: { variant: 'default' as const, label: 'Sent' },
      blocked: { variant: 'destructive' as const, label: 'Blocked' },
    };

    if (fraudAlert && status === 'pending_approval') {
      return (
        <Badge variant="destructive" className="bg-yellow-100 text-yellow-800">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Fraud Alert
        </Badge>
      );
    }

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const columns: Column<Payment>[] = [
    {
      key: "id",
      header: "Payment ID",
      cell: (payment) => (
        <div>
          <div className="font-medium text-foreground">{payment.id}</div>
          <div className="text-xs text-muted-foreground capitalize">
            {payment.type.replace('_', ' ')}
          </div>
        </div>
      )
    },
    {
      key: "beneficiaryName",
      header: "Beneficiary",
      cell: (payment) => (
        <div>
          <div className="font-medium text-foreground">{payment.beneficiaryName}</div>
          <div className="text-xs text-muted-foreground">{payment.beneficiaryAccount}</div>
        </div>
      )
    },
    {
      key: "amount",
      header: "Amount",
      className: "text-right",
      cell: (payment) => (
        <span className="text-foreground font-medium">
          ${payment.amount.toLocaleString()}
        </span>
      )
    },
    {
      key: "status",
      header: "Status",
      className: "text-center",
      cell: (payment) => getStatusBadge(payment.status, payment.fraudAlert)
    },
    {
      key: "createdAt",
      header: "Actions",
      className: "text-center",
      cell: (payment) => (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPayment(payment);
            }}
            data-testid={`button-view-${payment.id}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {payment.status === 'pending_approval' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  approvePayment(payment.id);
                }}
                className="text-accent hover:text-accent/80"
                data-testid={`button-approve-${payment.id}`}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  rejectPayment(payment.id);
                }}
                className="text-destructive hover:text-destructive/80"
                data-testid={`button-reject-${payment.id}`}
              >
                <Ban className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  const statusCounts = {
    all: payments.length,
    draft: payments.filter(p => p.status === 'draft').length,
    pending_approval: payments.filter(p => p.status === 'pending_approval').length,
    approved: payments.filter(p => p.status === 'approved').length,
    sent: payments.filter(p => p.status === 'sent').length,
    blocked: payments.filter(p => p.status === 'blocked').length,
  };

  return (
    <AppLayout>
      <div className="h-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Payments</h2>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-new-payment"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Payment
          </Button>
        </div>

        {/* Status Filter Tabs */}
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">
              All ({statusCounts.all})
            </TabsTrigger>
            <TabsTrigger value="draft" data-testid="tab-draft">
              Draft ({statusCounts.draft})
            </TabsTrigger>
            <TabsTrigger value="pending_approval" data-testid="tab-pending">
              Pending ({statusCounts.pending_approval})
            </TabsTrigger>
            <TabsTrigger value="approved" data-testid="tab-approved">
              Approved ({statusCounts.approved})
            </TabsTrigger>
            <TabsTrigger value="sent" data-testid="tab-sent">
              Sent ({statusCounts.sent})
            </TabsTrigger>
            <TabsTrigger value="blocked" data-testid="tab-blocked">
              Blocked ({statusCounts.blocked})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Payments Table */}
        <div className="bg-card border border-border rounded-lg">
          <DataTable
            data={filteredPayments}
            columns={columns}
            onRowClick={setSelectedPayment}
            className="min-h-96"
          />
        </div>

        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      </div>
    </AppLayout>
  );
}
