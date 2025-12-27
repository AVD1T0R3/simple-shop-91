import { Order } from '@/types/store';
import { formatCurrency } from '@/utils/formatCurrency';
import { Badge } from '@/components/ui/badge';
import { Package, User, Phone, Calendar, CreditCard } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (orders.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
        <p className="text-muted-foreground">
          Customer orders will appear here once they're placed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedOrders.map((order) => (
        <div
          key={order.id}
          className="bg-card border border-border rounded-xl p-4 md:p-6"
        >
          {/* Order Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-bold text-foreground">
                  {order.reference}
                </span>
                <Badge
                  variant={order.status === 'confirmed' ? 'default' : 'secondary'}
                  className={
                    order.status === 'confirmed'
                      ? 'bg-success text-success-foreground'
                      : ''
                  }
                >
                  {order.status === 'confirmed' ? 'Paid' : 'Pending'}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(order.total)}
              </p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="font-medium text-foreground">{order.customerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{order.customerPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Payment</p>
                <p className="font-medium text-foreground uppercase">
                  {order.paymentMethod} Money
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Items ({order.items.reduce((sum, item) => sum + item.quantity, 0)})
            </p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <span className="text-foreground">
                      {item.name} <span className="text-muted-foreground">×{item.quantity}</span>
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
