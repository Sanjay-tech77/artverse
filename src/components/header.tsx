import Link from 'next/link';
import { Palette, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const NavLinks = () => (
  <>
    <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
      Home
    </Link>
    <Link href="#gallery" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
      Gallery
    </Link>
    <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
      Artists
    </Link>
    <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
      About
    </Link>
  </>
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Palette className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold tracking-tight">ArtVerse Gallery</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Shopping Cart">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 pt-6">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
