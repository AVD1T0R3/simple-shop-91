import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem, Order } from '@/types/store';
import { initialProducts } from '@/data/initialProducts';

// Custom hook for managing store state with localStorage persistence
export function useStore() {
  // Products state - initialized from localStorage or default products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('store_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Cart state - persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('store_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders state - persisted to localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('store_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist products to localStorage
  useEffect(() => {
    localStorage.setItem('store_products', JSON.stringify(products));
  }, [products]);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('store_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist orders to localStorage
  useEffect(() => {
    localStorage.setItem('store_orders', JSON.stringify(orders));
  }, [orders]);

  // Add new product to catalog
  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  // Remove product from catalog
  const removeProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  // Update product details
  const updateProduct = useCallback((productId: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, ...updates } : p
      )
    );
  }, []);

  // Add item to cart or increase quantity
  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  // Update item quantity in cart
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Get total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Generate unique order reference
  const generateOrderReference = useCallback(() => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }, []);

  // Create new order
  const createOrder = useCallback((
    customerName: string,
    customerPhone: string,
    paymentMethod: 'mtn' | 'airtel'
  ): Order => {
    const order: Order = {
      id: Date.now().toString(),
      reference: generateOrderReference(),
      customerName,
      customerPhone,
      paymentMethod,
      items: [...cart],
      total: cartTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [...prev, order]);
    return order;
  }, [cart, cartTotal, generateOrderReference]);

  // Confirm order payment
  const confirmOrder = useCallback((orderReference: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.reference === orderReference
          ? { ...order, status: 'confirmed' }
          : order
      )
    );
    setCart([]); // Clear cart after confirmation
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    products,
    cart,
    orders,
    cartTotal,
    cartCount,
    addProduct,
    removeProduct,
    updateProduct,
    addToCart,
    removeFromCart,
    updateQuantity,
    createOrder,
    confirmOrder,
    clearCart,
    generateOrderReference,
  };
}
