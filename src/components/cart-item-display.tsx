
'use client';

import Image from 'next/image';
import type { CartItem } from '@/types/cart';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react'; 
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

  // Increased image dimensions: w-28 (112px), h-36 (144px)
  const placeholderImageUrl = `https://picsum.photos/seed/cart-${item.id}/112/144`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-b last:border-b-0">
      {/* Group 1: Image and Info */}
      <div className="flex flex-col items-center w-full sm:flex-row sm:items-center gap-3 sm:gap-4 sm:flex-1">
        {/* Increased image container size */}
        <div className="relative h-36 w-28 rounded-md overflow-hidden flex-shrink-0"> {/* Increased h-28 to h-36 and w-24 to w-28 */}
          <Image
            src={imageError ? placeholderImageUrl : item.imageUrl}
            alt={item.title}
            fill
            sizes="112px" // Updated sizes prop to match new width (112px for w-28)
            className="object-cover"
            onError={() => setImageError(true)}
            data-ai-hint={generateFamousPaintingHint(item.title)}
          />
        </div>
        <div className="flex-grow min-w-0 text-center sm:text-left">
          <h3 className="font-semibold text-md" title={item.title}>{item.title}</h3>
          <p className="text-sm text-muted-foreground">By {item.artist}</p>
          <p className="text-sm text-primary font-medium">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Group 2: Actions (Quantity, Subtotal, Remove Button) */}
      <div className="flex flex-col items-center w-full gap-3 sm:flex-row sm:w-auto sm:items-center sm:justify-end sm:gap-x-3 md:gap-x-4">
        {/* Quantity Controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
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
            className="h-8 w-12 text-center px-1 flex-shrink-0"
            min="1"
            aria-label="Item quantity"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Subtotal */}
        <div className="text-md font-semibold min-w-[70px] text-center sm:text-right flex-shrink-0">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        {/* Remove Button - Changed from icon to text button */}
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRemove}
          className="flex-shrink-0"
          aria-label={`Remove ${item.title} from cart`}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

