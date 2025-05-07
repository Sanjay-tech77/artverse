
'use client';
import Link from 'next/link';
import { Palette, ShoppingCart, Menu, Info, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import React from 'react';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';
import { ThemeToggleButton } from '@/components/theme-toggle-button';

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const commonLinkClass = "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors";
  // Consistent styling for all mobile links including padding and flex alignment
  const mobileLinkStyles = "block py-2 px-3 rounded-md hover:bg-accent flex items-center";

  const LinkWrapper = isMobile ? SheetClose : React.Fragment;

  const linksConfig = [
    { href: "/", label: "Home", icon: null, id: "home" },
    { href: "/#gallery", label: "Gallery", icon: null, id: "gallery" },
    { href: "/artists", label: "Artists", icon: Users, id: "artists" },
    { href: "/about", label: "About", icon: Info, id: "about" },
  ];

  return (
    <>
      {linksConfig.map(({ href, label, icon: IconComponent, id }) => {
        let linkClassName = commonLinkClass;
        if (isMobile) {
          linkClassName = `${commonLinkClass} ${mobileLinkStyles}`;
        } else {
          // For desktop, add flex items-center only if there's an icon
          if (IconComponent) {
            linkClassName = `${commonLinkClass} flex items-center`;
          }
        }

        return (
          <LinkWrapper key={id}>
            <Link href={href} className={linkClassName}>
              {isMobile ? (
                // Mobile: Render Icon or a Spacer for alignment
                IconComponent ? (
                  <IconComponent className="mr-2 h-4 w-4 flex-shrink-0" />
                ) : (
                  <span className="mr-2 h-4 w-4 flex-shrink-0"></span> // Spacer to align text
                )
              ) : (
                // Desktop: Render Icon if available, no spacer needed for non-icon links
                IconComponent && <IconComponent className="mr-2 h-4 w-4" />
              )}
              <span>{label}</span>
            </Link>
          </LinkWrapper>
        );
      })}
    </>
  );
};


export function Header() {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const commonMobileLinkClass = "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors";
  // This class should match the `mobileLinkStyles` in NavLinks for consistency
  const mobileCartLinkClass = "block py-2 px-3 rounded-md hover:bg-accent flex items-center";


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

        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggleButton />
          <Button variant="ghost" size="icon" aria-label="Shopping Cart" asChild className="h-9 w-9 md:h-10 md:w-10">
            <Link href="/checkout" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute top-[-0.3rem] right-[-0.3rem] h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                  {itemCount > 9 ? '9+' : itemCount}
                </Badge>
              )}
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" className="h-9 w-9">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader className="pb-4 border-b mb-4"> {/* Added border and margin for separation */}
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1">
                <NavLinks isMobile={true} />
                 <SheetClose asChild>
                    <Link
                      href="/checkout"
                      className={`${commonMobileLinkClass} ${mobileCartLinkClass}`}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Cart {itemCount > 0 && `(${itemCount > 9 ? '9+' : itemCount})`}</span>
                    </Link>
                  </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
