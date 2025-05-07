
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
import dynamic from 'next/dynamic';

const FeaturedArtistSection = dynamic(() => 
  import('@/components/featured-artist-section').then(mod => mod.FeaturedArtistSection),
  { 
    loading: () => (
      <div className="py-12 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <div className="max-w-md mx-auto bg-card p-6 rounded-xl shadow-lg border">
            <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-4 w-1/3 mx-auto" />
          </div>
        </div>
      </div>
    ),
    ssr: false 
  }
);

export default function HomePage() {
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    artist: 'all',
    sortBy: 'default',
  });
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    const timer = setTimeout(() => {
      setAllArtworks(sampleArtworks);
      setIsLoading(false);
    }, 500); 
    
    return () => clearTimeout(timer);
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
        
        <FeaturedArtistSection />
      </main>
      <Footer />
    </>
  );
}
