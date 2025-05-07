'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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
    // Always set localStorage if cartItems has been initialized,
    // even if it's empty, to reflect cleared carts.
    // Check if cartItems is not the initial empty array before initial load from localStorage is done.
    // This check helps prevent writing an empty array before potentially loading stored items.
    // However, given the load effect runs first, this should be fine.
    // A simpler approach might be to only run this if isInitialLoadDone.
    // For now, the existing logic:
    if (cartItems.length > 0 || localStorage.getItem('cartItems') !== null) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = useCallback((artwork: Artwork) => {
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
  }, [toast]);

  const removeFromCart = useCallback((artworkId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== artworkId));
     toast({
      title: "Item removed",
      description: `Item has been removed from your cart.`,
      variant: "destructive"
    });
  }, [toast]);

  const updateQuantity = useCallback((artworkId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(artworkId); // Relies on the memoized removeFromCart
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === artworkId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  
  const contextValue = useMemo(() => {
    // These functions are re-created if cartItems changes,
    // ensuring they always use the latest cartItems.
    const currentGetItemCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);
    const currentGetCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    return {
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal: currentGetCartTotal,
      getItemCount: currentGetItemCount,
    };
  }, [cartItems, addToCart, removeFromCart, updateQuantity, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
