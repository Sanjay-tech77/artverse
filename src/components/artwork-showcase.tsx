import type { Artwork } from '@/types/artwork';
import { ArtworkCard } from './artwork-card';

interface ArtworkShowcaseProps {
  artworks: Artwork[];
}

export function ArtworkShowcase({ artworks }: ArtworkShowcaseProps) {
  if (artworks.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No artworks match your criteria. Try adjusting the filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {artworks.map(artwork => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
