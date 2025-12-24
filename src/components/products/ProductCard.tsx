import { ShoppingCart, Plus } from 'lucide-react';
import { Product } from '@/types/store';
import { formatCurrency } from '@/utils/formatCurrency';
import { useStoreContext } from '@/context/StoreContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

// Individual product card component
export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStoreContext();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <article className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Quick Add Button - visible on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-glow"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
