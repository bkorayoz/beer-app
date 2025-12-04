/**
 * Site configuration constants
 */
export const SITE_CONFIG = {
  name: 'Istanbul School of Beers',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://istanbulschoolofbeers.com',
  description: 'Your premier destination for craft beer guides, reviews, and brewing tips in Istanbul. Discover the best craft beer spots, prices, and culture.',
  defaultLocale: 'en',
} as const;

