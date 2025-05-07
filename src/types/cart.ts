import type { Artwork } from './artwork';

export interface CartItem extends Artwork {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}
