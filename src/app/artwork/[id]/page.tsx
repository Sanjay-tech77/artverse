'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { sampleArtworks } from '@/data/sample-artworks';
import type { Artwork } from '@/types/artwork';
import { useCart } from '@/context/cart-context';
import { generateFamousPaintingHint } from '@/lib/utils';
import { ShoppingCart, ArrowLeft, Info, CalendarDays, Ruler, Paintbrush } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function ArtworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [artwork, setArtwork] = useState<Artwork | null | undefined>(undefined);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate fetching data
      const timer = setTimeout(() => {
        const foundArtwork = sampleArtworks.find((art) => art.id === id);
        setArtwork(foundArtwork || null);
        setIsLoading(false);
        if (foundArtwork) {
          setImageError(false); // Reset image error state when new artwork is loaded
        }
      }, 300); // Short delay to simulate network
      return () => clearTimeout(timer);
    } else {
      setArtwork(null); // If no ID, artwork is not found
      setIsLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (artwork) {
      addToCart(artwork);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <div className="mb-6">
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <Skeleton className="w-full aspect-[3/4] rounded-lg" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-full" />
              </div>
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!artwork) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 md:py-24 text-center">
           <Alert variant="destructive" className="max-w-md mx-auto">
            <Info className="h-4 w-4" />
            <AlertTitle>Artwork Not Found</AlertTitle>
            <AlertDescription>
              The artwork you are looking for does not exist or could not be found.
            </AlertDescription>
          </Alert>
          <Button asChild variant="outline" className="mt-8">
            <Link href="/#gallery">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }
  
  const placeholderImageUrl = `https://picsum.photos/seed/artwork-${artwork.id}/600/800`;

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="md:col-span-3">
            <Card className="overflow-hidden shadow-xl rounded-lg">
              <AspectRatio ratio={3 / 4} className="bg-muted">
                <Image
                  src={imageError ? placeholderImageUrl : artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 800px"
                  className="object-contain" // Changed to object-contain to show full image
                  onError={() => setImageError(true)}
                  data-ai-hint={generateFamousPaintingHint(artwork.title)}
                  priority // Prioritize loading for this main content image
                />
              </AspectRatio>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{artwork.title}</h1>
            <p className="text-xl text-muted-foreground">By {artwork.artist}</p>
            
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center text-sm">
                  <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium">Year:</span>&nbsp;{artwork.year}
                </div>
                <div className="flex items-center text-sm">
                  <Paintbrush className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium">Medium:</span>&nbsp;{artwork.medium}
                </div>
                <div className="flex items-center text-sm">
                  <Ruler className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium">Dimensions:</span>&nbsp;{artwork.dimensions}
                </div>
                 <div className="flex items-center text-sm">
                  <Info className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium">Category:</span>&nbsp;{artwork.category}
                </div>
              </CardContent>
            </Card>
            
            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">Description</h2>
              <p className="text-foreground/80 leading-relaxed">{artwork.description}</p>
            </div>
            
            <Separator />

            <div className="space-y-4">
              <p className="text-3xl font-bold text-primary">${artwork.price.toFixed(2)}</p>
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
