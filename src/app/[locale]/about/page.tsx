import { SemanticHeading } from '@/components/aeo/SemanticHeading';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { routing } from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = SITE_CONFIG.url;
  const locale = routing.defaultLocale;
  const canonicalUrl = `${baseUrl}/${locale}/about`;
  const description = 'Learn about Istanbul School of Beers, your premier destination for craft beer guides, reviews, and brewing tips. Discover our mission to bring the rich history and vibrant culture of beer to enthusiasts around the world.';

  return {
    title: 'About | Istanbul School of Beers',
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'About | Istanbul School of Beers',
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary',
      title: 'About | Istanbul School of Beers',
      description,
    },
  };
}

export default function AboutPage() {
  return (
    <div className="container py-12 px-4 md:px-6 max-w-3xl mx-auto">
      <SemanticHeading as="h1" className="mb-6">About Istanbul School of Beers</SemanticHeading>
      <div className="prose prose-stone dark:prose-invert">
        <p>
          Welcome to the Istanbul School of Beers, your premier destination for all things brewing, tasting, and appreciating.
          Our mission is to bring the rich history and vibrant culture of beer to enthusiasts around the world.
        </p>
        <p>
          Founded in 2025, we are dedicated to providing high-quality content that is both informative and engaging.
          Whether you are a homebrewer looking for tips or a casual drinker exploring new styles, we have something for you.
        </p>
      </div>
    </div>
  )
}

