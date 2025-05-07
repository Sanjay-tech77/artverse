
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

export function JoinArtisticJourneySection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 text-center">
        <Lightbulb className="h-16 w-16 text-accent mx-auto mb-6" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          Join Our Artistic Journey
        </h2>
        <p className="mt-4 mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you're an artist inspired by the masters, a collector seeking a significant piece, or simply an art enthusiast, ArtVerse Gallery welcomes you.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/artists">Discover Artists</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="mailto:contact@artversegallery.example.com">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
