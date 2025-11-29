import { Hero } from '@/components/Hero';
import { BlogGrid } from '@/components/home/BlogGrid';
import { StructuredData } from '@/components/aeo/StructuredData';
import { AdvancedSearch } from '@/components/home/AdvancedSearch';
import { WebSite, WithContext } from 'schema-dts';

export default function HomePage() {
  const structuredData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Classic Beer Blog',
    url: 'https://classicbeerblog.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://classicbeerblog.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    } as any,
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <Hero />
      <AdvancedSearch />
      <BlogGrid />
    </>
  );
}
