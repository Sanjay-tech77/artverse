'use client';
import Image from 'next/image';
import type { Artwork } from '@/types/artwork';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { generateArtworkImageHint } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(artwork);
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full rounded-lg group">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] relative w-full overflow-hidden">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill // Changed from layout="fill" objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={generateArtworkImageHint(artwork.category, artwork.medium)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-1 truncate" title={artwork.title}>{artwork.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">By {artwork.artist}</p>
        <CardDescription className="text-sm text-foreground/80 line-clamp-3 mb-3">
          {artwork.description}
        </CardDescription>
        <div className="text-lg font-bold text-primary">
          ${artwork.price.toFixed(2)}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
        <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
