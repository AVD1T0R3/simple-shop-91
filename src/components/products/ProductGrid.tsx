import { Product } from '@/types/store';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

// Grid layout for displaying products
export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div 
          key={product.id}
          style={{ animationDelay: `${index * 0.1}s` }}
          className="animate-slide-up"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
