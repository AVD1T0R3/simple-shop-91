import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useStoreContext } from '@/context/StoreContext';

// Shopping cart page
export default function Cart() {
  const { cart } = useStoreContext();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
              
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-primary hover:underline mt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
