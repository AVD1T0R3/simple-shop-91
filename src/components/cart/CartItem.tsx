import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/store';
import { formatCurrency } from '@/utils/formatCurrency';
import { useStoreContext } from '@/context/StoreContext';

interface CartItemProps {
  item: CartItemType;
}

// Individual cart item with quantity controls
export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useStoreContext();

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg shadow-sm animate-fade-in">
      {/* Product Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-base md:text-lg line-clamp-1">
          {item.name}
        </h3>
        <p className="text-primary font-bold text-sm md:text-base mt-1">
          {formatCurrency(item.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 text-secondary-foreground" />
          </button>
          <span className="font-semibold text-foreground min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 text-secondary-foreground" />
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="flex flex-col items-end justify-between">
        <span className="font-bold text-foreground text-base md:text-lg">
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-destructive hover:text-destructive/80 transition-colors p-2"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
