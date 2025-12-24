import { useState } from 'react';
import { Phone, User, CreditCard } from 'lucide-react';
import { Order } from '@/types/store';
import { useStoreContext } from '@/context/StoreContext';
import { toast } from 'sonner';

interface CheckoutFormProps {
  onOrderCreated: (order: Order) => void;
}

// Checkout form for customer details and payment method
export function CheckoutForm({ onOrderCreated }: CheckoutFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'airtel' | null>(null);
  const { createOrder, cartCount } = useStoreContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    if (cartCount === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Create order
    const order = createOrder(customerName.trim(), customerPhone.trim(), paymentMethod);
    onOrderCreated(order);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Details */}
      <div className="bg-card rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Customer Details
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your full name"
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                id="phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0700 123 456"
                maxLength={15}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-card rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Payment Method
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* MTN Mobile Money */}
          <button
            type="button"
            onClick={() => setPaymentMethod('mtn')}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              paymentMethod === 'mtn'
                ? 'border-mtn bg-mtn/10'
                : 'border-border hover:border-mtn/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-mtn flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">MTN</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">MTN Mobile Money</p>
                <p className="text-sm text-muted-foreground">Pay with MoMo</p>
              </div>
            </div>
            {paymentMethod === 'mtn' && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-mtn rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>

          {/* Airtel Money */}
          <button
            type="button"
            onClick={() => setPaymentMethod('airtel')}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              paymentMethod === 'airtel'
                ? 'border-airtel bg-airtel/10'
                : 'border-border hover:border-airtel/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-airtel flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">Airtel</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Airtel Money</p>
                <p className="text-sm text-muted-foreground">Pay with Airtel</p>
              </div>
            </div>
            {paymentMethod === 'airtel' && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-airtel rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={cartCount === 0}
        className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </form>
  );
}
