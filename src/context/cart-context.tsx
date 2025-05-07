'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Artwork } from '@/types/artwork';
import type { CartItem, CartContextType } from '@/types/cart';
import { useToast } from '@/hooks/use-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems));
      } catch (error) {
        console.error("Failed to parse cart items from localStorage", error);
        localStorage.removeItem('cartItems'); // Clear corrupted data
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem('cartItems')) { // Avoid writing empty array on initial load if nothing was stored
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (artwork: Artwork) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === artwork.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...artwork, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${artwork.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (artworkId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== artworkId));
     toast({
      title: "Item removed",
      description: `Item has been removed from your cart.`,
      variant: "destructive"
    });
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(artworkId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === artworkId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
