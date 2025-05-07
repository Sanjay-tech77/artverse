
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function ArtistSubmissionSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <User className="h-16 w-16 text-accent mx-auto mb-6" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          Share Your Artistic Vision
        </h2>
        <p className="mt-4 mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
          ArtVerse Gallery is a platform for exceptional art. If you are an artist with a unique voice, we invite you to connect with us.
        </p>
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
          <Link href="mailto:submissions@artversegallery.example.com">Artist Submissions</Link>
        </Button>
      </div>
    </section>
  );
}
