import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative bg-secondary/30 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image 
          src="https://picsum.photos/seed/heroartbg/1920/1080" 
          alt="Abstract art background" 
          layout="fill" 
          objectFit="cover"
          priority
          data-ai-hint="abstract art"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Discover Your Next Masterpiece
          </h1>
          <p className="mt-6 text-lg text-foreground/80 sm:text-xl">
            Explore a curated collection of unique paintings and digital art from talented artists around the globe. Find the perfect piece to inspire your space.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-200">
              <Link href="#gallery">Explore Gallery</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
