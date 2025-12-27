import { Product } from '@/types/store';

// Initial product catalog
export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    stockStatus: 'in_stock'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    description: 'Advanced smartwatch with health monitoring, GPS, and water resistance.',
    stockStatus: 'in_stock'
  },
  {
    id: '3',
    name: 'Leather Backpack',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    description: 'Genuine leather backpack with laptop compartment and premium finish.',
    stockStatus: 'few_units'
  },
  {
    id: '4',
    name: 'Running Sneakers',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    description: 'Lightweight running shoes with advanced cushioning technology.',
    stockStatus: 'in_stock'
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    description: 'Portable speaker with deep bass and 20-hour playtime.',
    stockStatus: 'pending_restock'
  },
  {
    id: '6',
    name: 'Sunglasses Classic',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
    description: 'UV protection sunglasses with polarized lenses and metal frame.',
    stockStatus: 'in_stock'
  }
];
