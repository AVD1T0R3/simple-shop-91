import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useStoreContext } from '@/context/StoreContext';

// Products page with catalog
export default function Products() {
  const { products } = useStoreContext();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Our Products
          </h1>
          <p className="text-muted-foreground">
            Discover our collection of quality products
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} />

        {/* Product Count */}
        <div className="mt-8 text-center text-muted-foreground">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </div>
      </div>
    </Layout>
  );
}
