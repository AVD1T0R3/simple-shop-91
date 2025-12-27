import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AddProductForm } from '@/components/products/AddProductForm';
import { useStoreContext } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, ShieldCheck, ClipboardList } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OrderHistory } from '@/components/admin/OrderHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Simple admin authentication (for demo purposes)
const ADMIN_PASSWORD = 'admin123';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { products, orders } = useStoreContext();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: 'Welcome Admin!',
        description: 'You now have access to the dashboard.',
      });
    } else {
      toast({
        title: 'Access Denied',
        description: 'Incorrect password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <Lock className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Access</h1>
              <p className="text-muted-foreground">
                Enter the admin password to access the dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Demo password: admin123
              </p>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-secondary rounded-lg">
            <ShieldCheck className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage products and view orders
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm">Total Products</p>
            <p className="text-3xl font-bold text-foreground">{products.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-foreground">{orders.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm">Confirmed</p>
            <p className="text-3xl font-bold text-success">
              {orders.filter(o => o.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm">Pending</p>
            <p className="text-3xl font-bold text-warning">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Tabs for Products and Orders */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Order History
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Add Product
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <OrderHistory orders={orders} />
          </TabsContent>
          
          <TabsContent value="products">
            <AddProductForm showByDefault />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
