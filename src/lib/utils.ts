import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateArtworkImageHint(category: string, medium: string): string {
  const catMain = category.split(' ')[0].toLowerCase(); // e.g. "abstract", "digital" from "Digital Art"
  const medLower = medium.toLowerCase();

  if (medLower.includes('acrylic') || medLower.includes('oil') || medLower.includes('watercolor') || medLower.includes('gouache') || medLower.includes('tempera')) {
    // For "Digital Art" + "Acrylic Paint", "digital painting" is better than "digital acrylic"
     if (catMain === 'digital' && (medLower.includes('paint') || medLower.includes('painting'))) return 'digital painting';
    return `${catMain} painting`;
  }
  if (medLower.includes('digital painting')) { // specific medium name
    return 'digital painting';
  }
  // If medium contains a common painting surface and not explicitly digital context for category
  if ((medLower.includes('canvas') || medLower.includes('panel') || medLower.includes('board')) && catMain !== 'digital') {
    return `${catMain} painting`;
  }
  if (medLower.includes('charcoal') || medLower.includes('pencil') || medLower.includes('ink') || medLower.includes('pastel') || medLower.includes('crayon')) {
    return `${catMain} drawing`;
  }
  if (medLower.includes('digital art') || category.toLowerCase().includes('digital art')) { 
    return 'digital art';
  }
  if (medLower.includes('mixed media')) {
    return `${catMain} art`; // "abstract art", "geometric art"
  }
  
  // Fallback: category's first word + medium's first word (if different and fits 2 words)
  const medMain = medLower.split(' ')[0];
  if (catMain !== medMain && medMain) {
    const combined = `${catMain} ${medMain}`;
    if (combined.split(' ').length <= 2) return combined;
  }
  
  // Single word fallback from category or if category is already two words (e.g. "still life")
  const categoryWords = category.toLowerCase().split(' ');
  if (categoryWords.length <= 2) return categoryWords.join(' ');
  
  return catMain; // "abstract", "portrait"
}
