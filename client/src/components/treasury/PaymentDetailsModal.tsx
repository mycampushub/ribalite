import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTreasuryStore } from "@/lib/store";
import { Payment } from "@shared/schema";
import { AlertTriangle, CheckCircle, Ban } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PaymentDetailsModalProps {
  payment: Payment | null;
  onClose: () => void;
}

export function PaymentDetailsModal({ payment, onClose }: PaymentDetailsModalProps) {
  const { approvePayment, rejectPayment } = useTreasuryStore();

  if (!payment) return null;

  const handleApprove = () => {
    approvePayment(payment.id);
    onClose();
  };

  const handleReject = () => {
    rejectPayment(payment.id);
    onClose();
  };

  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      draft: { variant: 'secondary' as const, label: 'Draft' },
      pending_approval: { variant: 'default' as const, label: 'Pending Approval' },
      approved: { variant: 'default' as const, label: 'Approved' },
      sent: { variant: 'default' as const, label: 'Sent' },
      blocked: { variant: 'destructive' as const, label: 'Blocked' },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Dialog open={!!payment} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" data-testid="modal-payment-details">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Review payment information and take action if needed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Fraud Alert */}
          {payment.fraudAlert && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Fraud Alert</AlertTitle>
              <AlertDescription>
                This payment has been flagged for potential fraud (Score: {payment.fraudScore}/100).
                Please review carefully before approval.
              </AlertDescription>
            </Alert>
          )}

          {/* Payment Information */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment ID:</span>
              <span className="font-medium">{payment.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Beneficiary:</span>
              <span className="font-medium">{payment.beneficiaryName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account:</span>
              <span className="font-medium">{payment.beneficiaryAccount}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium text-lg">
                ${payment.amount.toLocaleString()} {payment.currency}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium capitalize">
                {payment.type.replace('_', ' ')}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              {getStatusBadge(payment.status)}
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created By:</span>
              <span className="font-medium">{payment.createdBy}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium">
                {formatDistanceToNow(payment.createdAt, { addSuffix: true })}
              </span>
            </div>

            {payment.approvedBy && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Approved By:</span>
                  <span className="font-medium">{payment.approvedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Approved:</span>
                  <span className="font-medium">
                    {payment.approvedAt && formatDistanceToNow(payment.approvedAt, { addSuffix: true })}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          {payment.status === 'pending_approval' && (
            <>
              <Button
                variant="destructive"
                onClick={handleReject}
                data-testid="button-reject-payment"
              >
                <Ban className="mr-2 h-4 w-4" />
                Block Payment
              </Button>
              <Button
                onClick={handleApprove}
                data-testid="button-approve-payment"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
