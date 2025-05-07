import type { Artwork } from '@/types/artwork';

export const sampleArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    description: 'A half-length portrait painting by Italian artist Leonardo da Vinci, considered an archetypal masterpiece of the Italian Renaissance.',
    price: 100000000, // Mock price
    category: 'Renaissance',
    imageUrl: 'https://picsum.photos/seed/mona-lisa/600/800',
    medium: 'Oil on Poplar Panel',
    dimensions: '77 cm × 53 cm',
    year: 1506, // Approx completion
  },
  {
    id: '2',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    description: 'An oil-on-canvas painting by Dutch Post-Impressionist painter Vincent van Gogh, depicting his view from the window of his asylum room.',
    price: 90000000, // Mock price
    category: 'Post-Impressionism',
    imageUrl: 'https://picsum.photos/seed/starry-night/600/800',
    medium: 'Oil on Canvas',
    dimensions: '73.7 cm × 92.1 cm',
    year: 1889,
  },
  {
    id: '3',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    description: 'A 1931 painting by artist Salvador Dalí, and one of the most recognizable works of Surrealism, depicting soft, melting pocket watches.',
    price: 75000000, // Mock price
    category: 'Surrealism',
    imageUrl: 'https://picsum.photos/seed/persistence-memory/600/800',
    medium: 'Oil on Canvas',
    dimensions: '24 cm × 33 cm',
    year: 1931,
  },
  {
    id: '4',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    description: 'An oil painting by Dutch Golden Age painter Johannes Vermeer, dated c. 1665. It depicts a European girl wearing an exotic dress, an oriental turban, and a very large pearl earring.',
    price: 85000000, // Mock price
    category: 'Baroque',
    imageUrl: 'https://picsum.photos/seed/pearl-earring/600/800',
    medium: 'Oil on Canvas',
    dimensions: '44.5 cm × 39 cm',
    year: 1665,
  },
  {
    id: '5',
    title: 'The Scream',
    artist: 'Edvard Munch',
    description: 'A composition created by Norwegian Expressionist artist Edvard Munch in 1893. The agonized face in the painting has become one of the most iconic images of art.',
    price: 70000000, // Mock price
    category: 'Expressionism',
    imageUrl: 'https://picsum.photos/seed/the-scream/600/800',
    medium: 'Oil, Tempera, Pastel and Crayon on Cardboard',
    dimensions: '91 cm × 73.5 cm',
    year: 1893,
  },
  {
    id: '6',
    title: 'The Last Supper',
    artist: 'Leonardo da Vinci',
    description: 'A mural painting by the Italian High Renaissance artist Leonardo da Vinci, dated to c. 1495–1498. The painting represents the scene of the Last Supper of Jesus with his apostles.',
    price: 120000000, // Mock price
    category: 'Renaissance',
    imageUrl: 'https://picsum.photos/seed/last-supper/800/600', // Wider format
    medium: 'Tempera on Gesso, Pitch and Mastic',
    dimensions: '460 cm × 880 cm',
    year: 1498, // Approx completion
  },
   {
    id: '7',
    title: 'Guernica',
    artist: 'Pablo Picasso',
    description: 'A large 1937 oil painting on canvas by Spanish artist Pablo Picasso. It is one of his best-known works, regarded by many art critics as the most moving and powerful anti-war painting in history.',
    price: 110000000, // Mock price
    category: 'Cubism',
    imageUrl: 'https://picsum.photos/seed/guernica/800/600', // Wider format
    medium: 'Oil on Canvas',
    dimensions: '349 cm × 776 cm',
    year: 1937,
  },
  {
    id: '8',
    title: 'The Night Watch',
    artist: 'Rembrandt van Rijn',
    description: 'Militia Company of District II under the Command of Captain Frans Banninck Cocq, commonly referred to as The Night Watch. Painted in 1642 by Rembrandt van Rijn.',
    price: 95000000, // Mock price
    category: 'Baroque',
    imageUrl: 'https://picsum.photos/seed/night-watch/800/700', // Slightly different aspect ratio
    medium: 'Oil on Canvas',
    dimensions: '363 cm × 437 cm',
    year: 1642,
  },
];
