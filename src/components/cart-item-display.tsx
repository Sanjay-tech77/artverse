'use client';

import Image from 'next/image';
import type { CartItem } from '@/types/cart';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemDisplayProps {
  item: CartItem;
}

export function CartItemDisplay({ item }: CartItemDisplayProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-24 w-20 rounded-md overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="80px"
          className="object-cover"
          data-ai-hint="artwork small"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-md">{item.title}</h3>
        <p className="text-sm text-muted-foreground">By {item.artist}</p>
        <p className="text-sm text-primary font-medium">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
          className="h-8 w-12 text-center"
          min="1"
          aria-label="Item quantity"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-md font-semibold w-20 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <Button variant="ghost" size="icon" onClick={handleRemove} className="text-destructive hover:text-destructive/80" aria-label="Remove item">
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
