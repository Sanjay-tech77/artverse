import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateArtworkImageHint(category: string, medium: string): string {
  const catMain = category?.split(' ')[0].toLowerCase() || 'art';
  const medLower = medium?.toLowerCase() || 'media';

  if (medLower.includes('acrylic') || medLower.includes('oil') || medLower.includes('watercolor') || medLower.includes('gouache') || medLower.includes('tempera')) {
    if (catMain === 'digital' && (medLower.includes('paint') || medLower.includes('painting'))) return 'digital painting';
    return `${catMain} painting`;
  }
  if (medLower.includes('digital painting')) {
    return 'digital painting';
  }
  if ((medLower.includes('canvas') || medLower.includes('panel') || medLower.includes('board')) && catMain !== 'digital') {
    return `${catMain} painting`;
  }
  if (medLower.includes('charcoal') || medLower.includes('pencil') || medLower.includes('ink') || medLower.includes('pastel') || medLower.includes('crayon')) {
    return `${catMain} drawing`;
  }
  if (medLower.includes('digital art') || category?.toLowerCase().includes('digital art')) { 
    return 'digital art';
  }
  if (medLower.includes('mixed media')) {
    return `${catMain} art`; 
  }
  
  const medMain = medLower.split(' ')[0];
  if (catMain !== medMain && medMain) {
    const combined = `${catMain} ${medMain}`;
    if (combined.split(' ').length <= 2) return combined;
  }
  
  const categoryWords = category?.toLowerCase().split(' ') || [catMain];
  if (categoryWords.length <= 2) return categoryWords.join(' ');
  
  return catMain;
}

export function generateFamousPaintingHint(title: string): string {
  if (!title) return 'classic art';
  const commonWords = new Set(['the', 'a', 'an', 'of', 'in', 'on', 'at', 'by', 'with', 'and', 'or', 'from', 'to', 'is', 'for', 'de', 'la', 'le', 'el']);
  
  let words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '') 
    .split(/\s+/)
    .filter(word => word.length > 0 && !commonWords.has(word)); 

  if (words.length === 0) {
    words = title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(/\s+/).filter(word => word.length > 0);
  }
  
  if (words.length === 1) return words[0];
  if (words.length >= 2) return `${words[0]} ${words[1]}`;
  if (words.length > 0) return words[0];
  
  // Fallback to a generic term if title is very short or unparseable
  const genericTitleFallback = title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(/\s+/).filter(w => w.length > 2).slice(0,2).join(' ');
  if (genericTitleFallback) return genericTitleFallback;

  return 'classic art';
}
