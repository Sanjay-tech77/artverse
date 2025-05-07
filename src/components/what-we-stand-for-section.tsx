
'use client';

import { Users, Palette, Target } from 'lucide-react';

export function WhatWeStandForSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Palette className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Celebrating Artistic Legacy</h3>
            <p className="text-muted-foreground">We honor diverse artistic expressions and provide a platform for both legendary masters and contemporary visionaries.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Building an Art Community</h3>
            <p className="text-muted-foreground">We foster connections between artists, collectors, historians, and art lovers, creating a rich cultural ecosystem.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Target className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Curated Excellence</h3>
            <p className="text-muted-foreground">Our collection is thoughtfully selected to ensure historical importance, originality, and profound artistic merit.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
