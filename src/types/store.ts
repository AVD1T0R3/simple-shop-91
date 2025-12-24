// Product type definition
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Cart item extends Product with quantity
export interface CartItem extends Product {
  quantity: number;
}

// Order type for checkout
export interface Order {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: 'mtn' | 'airtel';
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

// Payment confirmation type
export interface PaymentConfirmation {
  customerName: string;
  phoneNumber: string;
  network: 'mtn' | 'airtel';
  orderReference: string;
}
