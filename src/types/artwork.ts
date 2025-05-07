export interface Artwork {
  id: string;
  title: string;
  artist: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  medium: string; // e.g., Oil on canvas, Digital, Sculpture
  dimensions: string; // e.g., "24x36 inches"
  year: number;
}
