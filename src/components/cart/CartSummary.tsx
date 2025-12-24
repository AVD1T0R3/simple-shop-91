import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { useStoreContext } from '@/context/StoreContext';

// Cart summary with total and checkout button
export function CartSummary() {
  const { cartTotal, cartCount } = useStoreContext();

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-muted-foreground">
          <span>Items ({cartCount})</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery</span>
          <span className="text-accent font-medium">Free</span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-foreground font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(cartTotal)}</span>
          </div>
        </div>
      </div>

      <Link
        to="/checkout"
        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Proceed to Checkout
        <ArrowRight className="w-5 h-5" />
      </Link>

      <Link
        to="/products"
        className="block text-center mt-4 text-muted-foreground hover:text-primary text-sm transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
