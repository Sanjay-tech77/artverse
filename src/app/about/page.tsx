
'use client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const WhatWeStandForSection = dynamic(() => 
  import('@/components/what-we-stand-for-section').then(mod => mod.WhatWeStandForSection),
  {
    loading: () => (
      <div className="py-12 md:py-16 lg:py-20 bg-card">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-1/2 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
);

const JoinArtisticJourneySection = dynamic(() =>
  import('@/components/join-artistic-journey-section').then(mod => mod.JoinArtisticJourneySection),
  {
    loading: () => (
       <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-16 w-16 rounded-full mx-auto mb-6" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <div className="space-x-4">
            <Skeleton className="h-12 w-36 inline-block" />
            <Skeleton className="h-12 w-36 inline-block" />
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
);


export default function AboutPage() {
  const [galleryImageError, setGalleryImageError] = useState(false);

  const galleryOriginalImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Hubert_Robert_-_Projet_d%27am%C3%A9nagement_de_la_Grande_Galerie_du_Louvre_-_1796.jpg/800px-Hubert_Robert_-_Projet_d%27am%C3%A9nagement_de_la_Grande_Galerie_du_Louvre_-_1796.jpg";
  const galleryPlaceholderImageUrl = `https://picsum.photos/seed/louvre-about/800/600`;

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24 lg:py-32 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              About ArtVerse Gallery
            </h1>
            <p className="mt-6 text-lg text-foreground/80 sm:text-xl max-w-3xl mx-auto">
              Dedicated to showcasing timeless artistic visions and connecting art lovers with legendary creators from history and today.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  ArtVerse Gallery was founded with a profound mission: to create a vibrant space where art, history, and community flourish. We believe that art has the power to inspire, provoke thought, and enrich lives across generations.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our platform serves as a bridge, connecting connoisseurs with iconic masterpieces and the stories behind them. We meticulously curate a diverse range of artworks, celebrating both historical significance and contemporary talent.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/#gallery">Explore Our Collection</Link>
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={galleryImageError ? galleryPlaceholderImageUrl : galleryOriginalImageUrl}
                  alt="Gallery of the Louvre by Hubert Robert"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  onError={() => setGalleryImageError(true)}
                  data-ai-hint="louvre gallery" 
                  priority // Added priority for this prominent image
                />
              </div>
            </div>
          </div>
        </section>

        <WhatWeStandForSection />
        
        <JoinArtisticJourneySection />

      </main>
      <Footer />
    </>
  );
}
