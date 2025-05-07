'use client';

import type { Artwork } from '@/types/artwork';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { ListFilter, Palette, User, DollarSign, ArrowDownUp } from 'lucide-react';
import { Button } from './ui/button';

interface ArtworkFiltersProps {
  artworks: Artwork[];
  onFilterChange: (filters: { category: string; artist: string; sortBy: string }) => void;
  currentFilters: { category: string; artist: string; sortBy: string };
}

export function ArtworkFilters({ artworks, onFilterChange, currentFilters }: ArtworkFiltersProps) {
  const categories = Array.from(new Set(artworks.map(art => art.category)));
  const artists = Array.from(new Set(artworks.map(art => art.artist)));

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...currentFilters, category: value });
  };

  const handleArtistChange = (value: string) => {
    onFilterChange({ ...currentFilters, artist: value });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ ...currentFilters, sortBy: value });
  };

  const resetFilters = () => {
    onFilterChange({ category: 'all', artist: 'all', sortBy: 'default' });
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-xl shadow-md border">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
        <div>
          <Label htmlFor="category-filter" className="flex items-center text-sm font-medium mb-1.5">
            <Palette className="mr-2 h-4 w-4 text-muted-foreground" />
            Category
          </Label>
          <Select value={currentFilters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-filter" className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="artist-filter" className="flex items-center text-sm font-medium mb-1.5">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            Artist
          </Label>
          <Select value={currentFilters.artist} onValueChange={handleArtistChange}>
            <SelectTrigger id="artist-filter" className="w-full">
              <SelectValue placeholder="All Artists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Artists</SelectItem>
              {artists.map(artist => (
                <SelectItem key={artist} value={artist}>{artist}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sort-by" className="flex items-center text-sm font-medium mb-1.5">
             <ArrowDownUp className="mr-2 h-4 w-4 text-muted-foreground" />
            Sort By
          </Label>
          <Select value={currentFilters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger id="sort-by" className="w-full">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="title-asc">Title: A to Z</SelectItem>
              <SelectItem value="artist-asc">Artist: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={resetFilters} variant="outline" className="w-full sm:w-auto lg:self-end">
          <ListFilter className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </div>
    </div>
  );
}
