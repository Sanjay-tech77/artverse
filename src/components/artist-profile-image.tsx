'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ArtistProfileImageProps {
  src: string;
  alt: string;
  fallbackSeed: string;
  aiHint: string;
  width: number;
  height: number;
  className?: string;
}

export function ArtistProfileImage({ 
  src, 
  alt, 
  fallbackSeed, 
  aiHint, 
  width, 
  height, 
  className 
}: ArtistProfileImageProps) {
  const [hasError, setHasError] = useState(false);
  
  // Prioritize the provided src. If it's already a picsum URL (the original fallback), use it directly.
  // Otherwise, if an error occurs with a non-picsum src, then switch to a new picsum placeholder.
  const isOriginalSrcPicsum = src.includes('picsum.photos');
  const effectiveSrc = hasError && !isOriginalSrcPicsum 
    ? `https://picsum.photos/seed/${fallbackSeed}/${width}/${height}` 
    : src;

  return (
    <Image
      src={effectiveSrc}
      alt={alt}
      width={width}
      height={height}
      className={className || "w-full h-auto object-cover aspect-square"}
      onError={() => {
        if (!isOriginalSrcPicsum) { // Only set error if the failing URL wasn't already a picsum URL
          setHasError(true);
        }
        // If the original src itself was a picsum URL and it failed, we don't try another picsum URL.
        // This prevents potential infinite loops if picsum.photos is down.
      }}
      data-ai-hint={aiHint}
    />
  );
}
