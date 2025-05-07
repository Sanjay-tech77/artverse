'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { sampleArtworks } from '@/data/sample-artworks';
import type { Artwork } from '@/types/artwork';
import { User, Palette } from 'lucide-react';


interface Artist {
  name: string;
  specialty: string; // e.g., Abstract, Digital Art
  bio: string;
  profileImageUrl: string;
  artworksCount: number;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch artists
    // In a real app, this would be an API call.
    // For now, we derive artists from sampleArtworks
    setTimeout(() => {
      const artistMap = new Map<string, { artworks: Artwork[], specialties: Set<string> }>();

      sampleArtworks.forEach(artwork => {
        if (!artistMap.has(artwork.artist)) {
          artistMap.set(artwork.artist, { artworks: [], specialties: new Set() });
        }
        artistMap.get(artwork.artist)!.artworks.push(artwork);
        artistMap.get(artwork.artist)!.specialties.add(artwork.category);
      });

      const fetchedArtists: Artist[] = Array.from(artistMap.entries()).map(([name, data], index) => ({
        name,
        specialty: Array.from(data.specialties).slice(0, 2).join(' & '), // Show up to 2 specialties
        bio: `An acclaimed artist known for ${Array.from(data.specialties).join(', ').toLowerCase()} pieces. ${name} explores themes of ${['nature', 'urban life', 'emotion', 'technology'][index % 4]} and ${['light', 'form', 'color', 'texture'][index % 4]}.`,
        profileImageUrl: `https://picsum.photos/seed/${name.toLowerCase().replace(/\s+/g, '-')}/400/400`,
        artworksCount: data.artworks.length,
      }));
      
      setArtists(fetchedArtists);
      setIsLoading(false);
    }, 700); // Simulate network delay
  }, []);

  const ArtistSkeleton = () => (
    <Card className="overflow-hidden shadow-lg flex flex-col h-full">
      <CardHeader className="p-0">
        <Skeleton className="w-full aspect-square" />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-5 w-1/3" />
      </CardContent>
    </Card>
  );

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24 lg:py-32 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Meet Our Talented Artists
            </h1>
            <p className="mt-6 text-lg text-foreground/80 sm:text-xl max-w-3xl mx-auto">
              Discover the creative minds behind the masterpieces. Each artist brings a unique perspective and style to ArtVerse Gallery.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ArtistSkeleton key={index} />
                ))}
              </div>
            ) : artists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {artists.map((artist) => (
                  <Card key={artist.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full rounded-lg">
                    <CardHeader className="p-0 relative">
                      <Image
                        src={artist.profileImageUrl}
                        alt={artist.name}
                        width={400}
                        height={400}
                        className="w-full h-auto object-cover aspect-square"
                        data-ai-hint="artist portrait"
                      />
                    </CardHeader>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <CardTitle className="text-2xl font-semibold mb-1">{artist.name}</CardTitle>
                      <p className="text-sm text-primary mb-3 flex items-center">
                        <Palette size={16} className="mr-1.5" /> {artist.specialty}
                      </p>
                      <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                        {artist.bio}
                      </CardDescription>
                      <div className="flex justify-between items-center text-sm text-foreground/90">
                         <span className="font-medium">{artist.artworksCount} Artworks</span>
                         <Button variant="outline" size="sm" asChild>
                           <Link href={`/#gallery?artist=${encodeURIComponent(artist.name)}`}>View Profile</Link>
                         </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-lg">No artists found at this time. Please check back later.</p>
            )}
          </div>
        </section>
        
        <section className="py-12 md:py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <User className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Are You an Artist?
            </h2>
            <p className="mt-4 mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              We are always looking for fresh talent to join our gallery. If you believe your art aligns with our vision, we'd love to hear from you.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#">Submit Your Portfolio</Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
