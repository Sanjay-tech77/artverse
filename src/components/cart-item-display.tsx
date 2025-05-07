'use client';

import Image from 'next/image';
import type { CartItem } from '@/types/cart';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { generateFamousPaintingHint } from '@/lib/utils';
import { useState } from 'react';

interface CartItemDisplayProps {
  item: CartItem;
}

export function CartItemDisplay({ item }: CartItemDisplayProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleQuantityChange = (newQuantityValue: number | string) => {
    const newQuantity = Math.max(1, parseInt(String(newQuantityValue), 10) || 1);
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const placeholderImageUrl = `https://picsum.photos/seed/cart-${item.id}/80/96`;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3 sm:gap-x-4 py-4 border-b last:border-b-0">
      <div className="relative h-24 w-20 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={imageError ? placeholderImageUrl : item.imageUrl}
          alt={item.title}
          fill
          sizes="80px"
          className="object-cover"
          onError={() => setImageError(true)}
          data-ai-hint={generateFamousPaintingHint(item.title)}
        />
      </div>
      {/* Info section: allow it to take up space and truncate title */}
      <div className="flex-grow min-w-0 basis-40 sm:basis-auto"> {/* basis-40 gives it some initial space before growing/shrinking */}
        <h3 className="font-semibold text-md truncate" title={item.title}>{item.title}</h3>
        <p className="text-sm text-muted-foreground">By {item.artist}</p>
        <p className="text-sm text-primary font-medium">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls: Use smaller gaps and allow shrinking. */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
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
          onChange={(e) => handleQuantityChange(e.target.valueAsNumber)}
          className="h-8 w-12 text-center px-1" // w-12 should be fine, px-1 for text padding
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

      {/* Subtotal: Remove fixed width, use min-width. Ensure text-right. */}
      {/* ml-auto pushes this block to the right IF it wraps to a new line after the info section */}
      {/* sm:ml-2 adds a small margin on larger screens where it's likely in the same row */}
      <div className="text-md font-semibold min-w-[4.5rem] text-right flex-shrink-0 ml-auto sm:ml-2"> {/* 4.5rem ~ $XXX.XX */}
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button: Standard size, flex-shrink-0 to prevent squishing */}
      {/* ml-2 for spacing. No ml-auto here as subtotal handles pushing the group to the right when wrapped */}
      <Button variant="ghost" size="icon" onClick={handleRemove} className="text-destructive hover:text-destructive/80 flex-shrink-0 ml-1 sm:ml-2">
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
