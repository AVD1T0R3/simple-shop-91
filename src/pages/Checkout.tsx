import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { PaymentInstructions } from '@/components/checkout/PaymentInstructions';
import { useStoreContext } from '@/context/StoreContext';
import { Order } from '@/types/store';
import { formatCurrency } from '@/utils/formatCurrency';

// Checkout page with multi-step flow
export default function Checkout() {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const { cart, cartTotal } = useStoreContext();
  const navigate = useNavigate();

  const handleOrderCreated = (order: Order) => {
    setCurrentOrder(order);
  };

  const handlePaymentConfirmed = () => {
    setOrderConfirmed(true);
  };

  // Redirect if cart is empty and no order in progress
  if (cart.length === 0 && !currentOrder && !orderConfirmed) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No items to checkout</h2>
          <p className="text-muted-foreground mb-6">Add some products to your cart first.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold"
          >
            Browse Products
          </Link>
        </div>
      </Layout>
    );
  }

  // Order Confirmed Success Screen
  if (orderConfirmed && currentOrder) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center animate-scale-in">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order reference is:
            </p>
            <div className="bg-card rounded-lg p-6 shadow-md mb-8">
              <p className="font-mono text-2xl font-bold text-primary">{currentOrder.reference}</p>
              <p className="text-muted-foreground mt-2">Total: {formatCurrency(currentOrder.total)}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              We'll process your order shortly. You'll receive updates via the phone number provided.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Link */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              {currentOrder ? 'Complete Payment' : 'Checkout'}
            </h1>

            {currentOrder ? (
              <PaymentInstructions 
                order={currentOrder} 
                onPaymentConfirmed={handlePaymentConfirmed}
              />
            ) : (
              <CheckoutForm onOrderCreated={handleOrderCreated} />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
              
              {/* Order Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {(currentOrder?.items || cart).map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-foreground font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(currentOrder?.total || cartTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
