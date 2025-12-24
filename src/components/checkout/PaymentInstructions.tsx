import { useState } from 'react';
import { Copy, CheckCircle, Phone, AlertCircle } from 'lucide-react';
import { Order } from '@/types/store';
import { formatCurrency } from '@/utils/formatCurrency';
import { useStoreContext } from '@/context/StoreContext';
import { toast } from 'sonner';

interface PaymentInstructionsProps {
  order: Order;
  onPaymentConfirmed: () => void;
}

// Payment instructions and confirmation form
export function PaymentInstructions({ order, onPaymentConfirmed }: PaymentInstructionsProps) {
  const [confirmName, setConfirmName] = useState(order.customerName);
  const [confirmPhone, setConfirmPhone] = useState('');
  const [confirmNetwork, setConfirmNetwork] = useState<'mtn' | 'airtel'>(order.paymentMethod);
  const [copied, setCopied] = useState(false);
  const { confirmOrder } = useStoreContext();

  // Business payment numbers
  const paymentNumbers = {
    mtn: '0770 123 456',
    airtel: '0750 123 456',
  };

  const paymentNumber = paymentNumbers[order.paymentMethod];

  const copyReference = () => {
    navigator.clipboard.writeText(order.reference);
    setCopied(true);
    toast.success('Reference copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!confirmPhone.trim() || confirmPhone.length < 10) {
      toast.error('Please enter the phone number used to pay');
      return;
    }

    confirmOrder(order.reference);
    toast.success('Payment confirmed! Thank you for your order.');
    onPaymentConfirmed();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Payment Instructions Card */}
      <div className="bg-card rounded-lg p-6 shadow-md border-l-4 border-primary">
        <h3 className="text-xl font-bold text-foreground mb-4">Payment Instructions</h3>

        <div className="space-y-4">
          {/* Order Reference */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Order Reference</p>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono font-bold text-lg text-foreground">{order.reference}</span>
              <button
                onClick={copyReference}
                className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
              >
                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Amount to Pay</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(order.total)}</span>
          </div>

          {/* Payment Number */}
          <div className={`rounded-lg p-4 ${order.paymentMethod === 'mtn' ? 'bg-mtn/20' : 'bg-airtel/20'}`}>
            <p className="text-sm font-medium text-foreground mb-2">
              Send payment to this {order.paymentMethod === 'mtn' ? 'MTN' : 'Airtel'} number:
            </p>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-foreground" />
              <span className="text-2xl font-bold text-foreground">{paymentNumber}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-secondary rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              How to Pay
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Open your {order.paymentMethod === 'mtn' ? 'MTN MoMo' : 'Airtel Money'} app or dial *165#</li>
              <li>Select "Send Money" or "Transfer"</li>
              <li>Enter the business number: <strong className="text-foreground">{paymentNumber}</strong></li>
              <li>Enter the amount: <strong className="text-foreground">{formatCurrency(order.total)}</strong></li>
              <li>Add reference: <strong className="text-foreground">{order.reference}</strong></li>
              <li>Confirm and complete the transaction</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Form */}
      <form onSubmit={handleConfirmPayment} className="bg-card rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Confirm Your Payment
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          After completing the payment, fill in your details below to confirm.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="confirmName" className="block text-sm font-medium text-foreground mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="confirmName"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your name"
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="confirmPhone" className="block text-sm font-medium text-foreground mb-1">
              Phone Number Used to Pay
            </label>
            <input
              type="tel"
              id="confirmPhone"
              value={confirmPhone}
              onChange={(e) => setConfirmPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="0700 123 456"
              maxLength={15}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Network Used
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="network"
                  checked={confirmNetwork === 'mtn'}
                  onChange={() => setConfirmNetwork('mtn')}
                  className="w-4 h-4 text-mtn"
                />
                <span className="text-foreground">MTN</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="network"
                  checked={confirmNetwork === 'airtel'}
                  onChange={() => setConfirmNetwork('airtel')}
                  className="w-4 h-4 text-airtel"
                />
                <span className="text-foreground">Airtel</span>
              </label>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              Order Reference: <strong className="text-foreground">{order.reference}</strong>
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-success text-success-foreground py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-6 h-6" />
          I Have Paid
        </button>
      </form>
    </div>
  );
}
