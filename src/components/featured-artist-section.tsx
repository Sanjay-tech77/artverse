
'use client';

import Image from 'next/image';
import { useState } from 'react';

export function FeaturedArtistSection() {
  const [featuredArtistImageError, setFeaturedArtistImageError] = useState(false);
  const featuredArtistOriginalImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo_da_Vinci.jpg/800px-Francesco_Melzi_-_Portrait_of_Leonardo_da_Vinci.jpg";
  const featuredArtistPlaceholderImageUrl = `https://picsum.photos/seed/davinci-featured/200/200`;

  return (
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
  );
}
