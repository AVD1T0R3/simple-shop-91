import { useState } from 'react';
import { Product, StockStatus } from '@/types/store';
import { useStoreContext } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { Trash2, Package, AlertTriangle, Clock, XCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const stockStatusConfig: Record<StockStatus, { label: string; icon: typeof Package; className: string }> = {
  in_stock: { label: 'In Stock', icon: CheckCircle, className: 'bg-success/10 text-success border-success/20' },
  few_units: { label: 'Few Units Left', icon: AlertTriangle, className: 'bg-warning/10 text-warning border-warning/20' },
  pending_restock: { label: 'Pending Restock', icon: Clock, className: 'bg-accent/10 text-accent-foreground border-accent/20' },
  unavailable: { label: 'Unavailable', icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

type FilterStatus = 'all' | StockStatus;

export function ProductManagement() {
  const { products, removeProduct, updateProduct } = useStoreContext();
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.stockStatus === filter);

  const handleStatusChange = (productId: string, newStatus: StockStatus) => {
    updateProduct(productId, { stockStatus: newStatus });
    toast.success('Product status updated');
  };

  const handleRemove = (product: Product) => {
    removeProduct(product.id);
    toast.success(`"${product.name}" removed from catalog`);
  };

  const getStatusCounts = () => ({
    all: products.length,
    in_stock: products.filter(p => p.stockStatus === 'in_stock').length,
    few_units: products.filter(p => p.stockStatus === 'few_units').length,
    pending_restock: products.filter(p => p.stockStatus === 'pending_restock').length,
    unavailable: products.filter(p => p.stockStatus === 'unavailable').length,
  });

  const counts = getStatusCounts();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Filter Tabs */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="gap-2"
          >
            <Package className="w-4 h-4" />
            All ({counts.all})
          </Button>
          <Button
            variant={filter === 'in_stock' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('in_stock')}
            className="gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            In Stock ({counts.in_stock})
          </Button>
          <Button
            variant={filter === 'few_units' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('few_units')}
            className="gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Few Units ({counts.few_units})
          </Button>
          <Button
            variant={filter === 'pending_restock' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending_restock')}
            className="gap-2"
          >
            <Clock className="w-4 h-4" />
            Pending ({counts.pending_restock})
          </Button>
          <Button
            variant={filter === 'unavailable' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('unavailable')}
            className="gap-2"
          >
            <XCircle className="w-4 h-4" />
            Unavailable ({counts.unavailable})
          </Button>
        </div>
      </div>

      {/* Products List */}
      <div className="divide-y divide-border">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No products found with this filter</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const status = stockStatusConfig[product.stockStatus || 'in_stock'];
            const StatusIcon = status.icon;
            
            return (
              <div
                key={product.id}
                className="p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors"
              >
                {/* Product Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{formatCurrency(product.price)}</p>
                  <Badge variant="outline" className={`mt-1 ${status.className}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>

                {/* Status Selector */}
                <Select
                  value={product.stockStatus || 'in_stock'}
                  onValueChange={(value) => handleStatusChange(product.id, value as StockStatus)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_stock">In Stock</SelectItem>
                    <SelectItem value="few_units">Few Units Left</SelectItem>
                    <SelectItem value="pending_restock">Pending Restock</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>

                {/* Remove Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Product?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove "{product.name}" from the catalog? 
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemove(product)}>
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
