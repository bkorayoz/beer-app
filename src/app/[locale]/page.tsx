import { Hero } from '@/components/Hero';
import { SearchableBlogLayout } from '@/components/home/SearchableBlogLayout';
import { StructuredData } from '@/components/aeo/StructuredData';
import { WebSite, WithContext } from 'schema-dts';
import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { routing } from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = SITE_CONFIG.url;
  const locale = routing.defaultLocale;
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title: 'Istanbul School of Beers | Craft Beer Guide & Blog',
    description: SITE_CONFIG.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Istanbul School of Beers | Craft Beer Guide & Blog',
      description: SITE_CONFIG.description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Istanbul School of Beers | Craft Beer Guide & Blog',
      description: SITE_CONFIG.description,
    },
  };
}

export default async function HomePage() {
  const posts = await getAllPosts();
  const structuredData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Istanbul School of Beers',
    url: 'https://istanbulschoolofbeers.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://istanbulschoolofbeers.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    } as any,
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <Hero />
      <SearchableBlogLayout posts={posts} />
    </>
  );
}
