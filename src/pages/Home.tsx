import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, Shield, Smartphone } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useStoreContext } from '@/context/StoreContext';
import { HeroCarousel } from '@/components/home/HeroCarousel';

// Home page with hero carousel and featured products
export default function Home() {
  const { products } = useStoreContext();
  const featuredProducts = products.slice(0, 3);

  return (
    <Layout>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShoppingBag, title: 'Quality Products', desc: 'Curated selection of premium items' },
              { icon: Smartphone, title: 'Mobile Money', desc: 'Pay with MTN or Airtel Money' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick and reliable shipping' },
              { icon: Shield, title: 'Secure Shopping', desc: 'Your data is always protected' },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-6 rounded-lg bg-background hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
              <p className="text-muted-foreground mt-1">Check out our latest arrivals</p>
            </div>
            <Link
              to="/products"
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            Browse our collection and experience the convenience of mobile money payments.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
