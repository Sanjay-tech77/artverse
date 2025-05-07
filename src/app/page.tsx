'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Artwork } from '@/types/artwork';
import { sampleArtworks } from '@/data/sample-artworks';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ArtworkFilters } from '@/components/artwork-filters';
import { ArtworkShowcase } from '@/components/artwork-showcase';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image'; 

export default function HomePage() {
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    artist: 'all',
    sortBy: 'default',
  });
  const [featuredArtistImageError, setFeaturedArtistImageError] = useState(false);

  const featuredArtistOriginalImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo_da_Vinci.jpg/800px-Francesco_Melzi_-_Portrait_of_Leonardo_da_Vinci.jpg";
  const featuredArtistPlaceholderImageUrl = `https://picsum.photos/seed/davinci-featured/200/200`;

  useEffect(() => {
    // Ensure the page scrolls to the top on initial load or reload.
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Simulate API call
    const timer = setTimeout(() => {
      setAllArtworks(sampleArtworks);
      setIsLoading(false);
    }, 500); // Simulate network delay
    
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const filteredAndSortedArtworks = useMemo(() => {
    let artworksToDisplay = [...allArtworks];

    if (filters.category !== 'all') {
      artworksToDisplay = artworksToDisplay.filter(art => art.category === filters.category);
    }
    if (filters.artist !== 'all') {
      artworksToDisplay = artworksToDisplay.filter(art => art.artist === filters.artist);
    }

    switch (filters.sortBy) {
      case 'price-asc':
        artworksToDisplay.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        artworksToDisplay.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        artworksToDisplay.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'artist-asc':
        artworksToDisplay.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      default:
        // Default sort or keep original order from sampleArtworks
        break;
    }
    return artworksToDisplay;
  }, [allArtworks, filters]);

  const handleFilterChange = (newFilters: { category: string; artist: string; sortBy: string }) => {
    setFilters(newFilters);
  };

  const GallerySkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      ))}
    </div>
  );


  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <section id="gallery" className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                Explore Our Collection
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover timeless masterpieces from renowned artists.
              </p>
            </div>
            <ArtworkFilters 
              artworks={allArtworks} 
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
            {isLoading ? (
              <GallerySkeleton />
            ) : (
              <ArtworkShowcase artworks={filteredAndSortedArtworks} />
            )}
          </div>
        </section>
        
        <section className="py-12 md:py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Featured Artist
            </h2>
            <p className="mt-4 mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              This month, we celebrate Leonardo da Vinci, a true Renaissance man whose genius spanned art, science, and invention.
            </p>
            <div className="max-w-md mx-auto bg-card p-6 rounded-xl shadow-lg border">
              <Image 
                src={featuredArtistImageError ? featuredArtistPlaceholderImageUrl : featuredArtistOriginalImageUrl} 
                alt="Leonardo da Vinci" 
                width={200}
                height={200}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary object-cover"
                onError={() => setFeaturedArtistImageError(true)}
                data-ai-hint="davinci portrait"
              />
              <h3 className="text-xl font-semibold">Leonardo da Vinci</h3>
              <p className="text-muted-foreground text-sm">High Renaissance Master</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
