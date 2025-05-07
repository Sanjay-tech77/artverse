import Link from 'next/link';
import { Palette, ShoppingCart, Menu, Info, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import React from 'react'; // Added import for React

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const commonLinkClass = "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors";
  const mobileLinkClass = "block py-2";

  const LinkWrapper = isMobile ? SheetClose : React.Fragment;

  return (
    <>
      <LinkWrapper>
        <Link href="/" className={`${commonLinkClass} ${isMobile ? mobileLinkClass : ''}`}>
          Home
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link href="/#gallery" className={`${commonLinkClass} ${isMobile ? mobileLinkClass : ''}`}>
          Gallery
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link href="/artists" className={`${commonLinkClass} ${isMobile ? mobileLinkClass : ''}`}>
          <Users className="inline-block mr-1 h-4 w-4" /> Artists
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link href="/about" className={`${commonLinkClass} ${isMobile ? mobileLinkClass : ''}`}>
          <Info className="inline-block mr-1 h-4 w-4" /> About
        </Link>
      </LinkWrapper>
    </>
  );
};


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
              <nav className="flex flex-col space-y-1 pt-6">
                <NavLinks isMobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

