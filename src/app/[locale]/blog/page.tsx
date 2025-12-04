import { BlogGrid } from '@/components/home/BlogGrid';
import { SemanticHeading } from '@/components/aeo/SemanticHeading';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { routing } from '@/i18n/routing';

import { getAllPosts } from '@/lib/mdx';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = SITE_CONFIG.url;
  const locale = routing.defaultLocale;
  const canonicalUrl = `${baseUrl}/${locale}/blog`;
  const description = 'Explore our collection of craft beer guides, reviews, and brewing tips. Discover the best beer spots in Istanbul and learn about the local craft beer culture.';

  return {
    title: 'Blog | Istanbul School of Beers',
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Blog | Istanbul School of Beers',
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary',
      title: 'Blog | Istanbul School of Beers',
      description,
    },
  };
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const t = await getTranslations('Navigation');

  return (
    <div className="container py-12 px-4 md:px-6">
      <SemanticHeading as="h1" className="mb-8 text-center">{t('blog')}</SemanticHeading>
      <BlogGrid posts={posts} />
    </div>
  )
}

