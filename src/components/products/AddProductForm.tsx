import { useState } from 'react';
import { Plus, X, ImageIcon } from 'lucide-react';
import { useStoreContext } from '@/context/StoreContext';
import { toast } from 'sonner';

interface AddProductFormProps {
  showByDefault?: boolean;
}

// Admin form to add new products
export function AddProductForm({ showByDefault = false }: AddProductFormProps) {
  const [isOpen, setIsOpen] = useState(showByDefault);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const { addProduct } = useStoreContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim() || !price || !image.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    // Add product and reset form
    addProduct({
      name: name.trim(),
      price: priceNum,
      image: image.trim(),
      description: description.trim(),
    });

    toast.success('Product added successfully!');
    setName('');
    setPrice('');
    setImage('');
    setDescription('');
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        {isOpen ? 'Close Form' : 'Add New Product'}
      </button>

      {/* Add Product Form */}
      {isOpen && (
        <form 
          onSubmit={handleSubmit}
          className="mt-4 bg-card rounded-lg p-6 shadow-md animate-scale-in"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Add New Product</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter product name"
                maxLength={100}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">
                Price (UGX)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter price"
                min="0"
                step="1000"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-1">
                Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://example.com/image.jpg"
                />
                {image && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                {!image && (
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Enter product description"
                rows={3}
                maxLength={500}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full md:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Add Product
          </button>
        </form>
      )}
    </div>
  );
}
