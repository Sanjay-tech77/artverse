'use client';
import Image from 'next/image';
import type { Artwork } from '@/types/artwork';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { generateFamousPaintingHint } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(artwork);
  };

  const placeholderImageUrl = `https://picsum.photos/seed/${artwork.id}/300/400`;

  return (
    <Card className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full rounded-lg">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] relative w-full overflow-hidden">
          <Image
            src={imageError ? placeholderImageUrl : artwork.imageUrl}
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            data-ai-hint={generateFamousPaintingHint(artwork.title)}
          />
        </div>
      </CardHeader>

      {/* Hover reveal section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-card/90 backdrop-blur-sm 
                      opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 
                      transition-all duration-300 ease-in-out">
        <CardContent className="p-0 mb-3">
          <CardTitle className="text-xl font-semibold mb-1 truncate" title={artwork.title}>{artwork.title}</CardTitle>
          <p className="text-sm text-muted-foreground mb-2">By {artwork.artist}</p>
          <CardDescription className="text-sm text-foreground/80 line-clamp-2 mb-2">
            {artwork.description}
          </CardDescription>
          <div className="text-lg font-bold text-primary">
            ${artwork.price.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter className="p-0 flex justify-between items-center">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/artwork/${artwork.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
