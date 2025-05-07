
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
import { ArtistProfileImage } from '@/components/artist-profile-image';
import dynamic from 'next/dynamic';

const ArtistSubmissionSection = dynamic(() =>
  import('@/components/artist-submission-section').then(mod => mod.ArtistSubmissionSection),
  {
    loading: () => (
      <div className="py-12 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-16 w-16 rounded-full mx-auto mb-6" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </div>
    ),
    ssr: false
  }
);

interface Artist {
  name: string;
  specialty: string; 
  bio: string;
  profileImageUrl: string;
  artworksCount: number;
}

const artistPortraits: Record<string, string> = {
  "Leonardo da Vinci": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo_da_Vinci.jpg/800px-Francesco_Melzi_-_Portrait_of_Leonardo_da_Vinci.jpg",
  "Vincent van Gogh": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
  "Salvador Dalí": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Salvador_Dal%C3%AD_New_York_World-Telegram_and_Sun_1960_crop.jpg/800px-Salvador_Dal%C3%AD_New_York_World-Telegram_and_Sun_1960_crop.jpg",
  "Johannes Vermeer": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Johannes_Vermeer_-_The_Procuress_-_detail_-_Portrait_of_the_Artist.jpg/800px-Johannes_Vermeer_-_The_Procuress_-_detail_-_Portrait_of_the_Artist.jpg",
  "Edvard Munch": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Edvard_Munch_-_Self-Portrait_with_Brushes_-_Google_Art_Project.jpg/800px-Edvard_Munch_-_Self-Portrait_with_Brushes_-_Google_Art_Project.jpg",
  "Pablo Picasso": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/800px-Pablo_picasso_1.jpg",
  "Rembrandt van Rijn": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
  "Claude Monet": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/800px-Claude_Monet_1899_Nadar_crop.jpg",
  "Grant Wood": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Grant_Wood_age_39_in_1930.jpg/800px-Grant_Wood_age_39_in_1930.jpg",
  "Sandro Botticelli": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Self-portrait_by_Sandro_Botticelli_close_up.jpg/800px-Self-portrait_by_Sandro_Botticelli_close_up.jpg"
};


export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        specialty: Array.from(data.specialties).slice(0, 2).join(' & '), 
        bio: `A renowned ${name} known for ${Array.from(data.specialties).join(', ').toLowerCase()} masterpieces. ${name}'s work often explores themes of ${['humanity', 'mythology', 'nature', 'spirituality'][index % 4]} and the interplay of ${['light and shadow', 'form and space', 'emotion and technique', 'observation and imagination'][index % 4]}.`,
        profileImageUrl: artistPortraits[name] || `https://picsum.photos/seed/${name.toLowerCase().replace(/\s+/g, '-')}-profile/400/400`,
        artworksCount: data.artworks.length,
      }));
      
      setArtists(fetchedArtists);
      setIsLoading(false);
    }, 700); 
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
              Meet Our Featured Artists
            </h1>
            <p className="mt-6 text-lg text-foreground/80 sm:text-xl max-w-3xl mx-auto">
              Discover the legendary figures behind timeless masterpieces. Each artist brings a unique vision that shaped art history.
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
                       <ArtistProfileImage
                        src={artist.profileImageUrl}
                        alt={artist.name}
                        fallbackSeed={`artist-${artist.name.toLowerCase().replace(/\s+/g, '-')}`}
                        aiHint={`${artist.name.split(' ').pop()?.toLowerCase() || 'artist'} portrait`}
                        width={400}
                        height={400}
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
                         <span className="font-medium">{artist.artworksCount} Masterpiece{artist.artworksCount === 1 ? '' : 's'}</span>
                         <Button variant="outline" size="sm" asChild>
                           <Link href={`/?artist=${encodeURIComponent(artist.name)}#gallery`}>View Works</Link>
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
        
        <ArtistSubmissionSection />

      </main>
      <Footer />
    </>
  );
}
