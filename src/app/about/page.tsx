import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Palette, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
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
              Dedicated to showcasing unique artistic visions and connecting art lovers with talented creators from around the globe.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  ArtVerse Gallery was founded with a simple yet profound mission: to create a vibrant space where art and community flourish. We believe that art has the power to inspire, provoke thought, and beautify lives.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our platform serves as a bridge, connecting passionate artists with discerning collectors and art enthusiasts. We meticulously curate a diverse range of artworks, ensuring quality and originality.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/#gallery">Explore Our Collection</Link>
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://picsum.photos/seed/galleryinside/800/600"
                  alt="Inside ArtVerse Gallery"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  data-ai-hint="art gallery interior"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Palette className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Celebrating Creativity</h3>
                <p className="text-muted-foreground">We champion diverse artistic expressions and provide a platform for both emerging and established artists.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Building Community</h3>
                <p className="text-muted-foreground">We foster connections between artists, collectors, and art lovers, creating a supportive ecosystem.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Curated Excellence</h3>
                <p className="text-muted-foreground">Our collection is carefully selected to ensure high quality, originality, and artistic merit.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <Lightbulb className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Join Our Artistic Journey
            </h2>
            <p className="mt-4 mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're an artist looking to showcase your work, a collector seeking the next masterpiece, or simply an art enthusiast, ArtVerse Gallery welcomes you.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/artists">Meet Our Artists</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="mailto:contact@artversegallery.example.com">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
