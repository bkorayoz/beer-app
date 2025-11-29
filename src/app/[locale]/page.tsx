import { Hero } from '@/components/Hero';
import { SearchableBlogLayout } from '@/components/home/SearchableBlogLayout';
import { StructuredData } from '@/components/aeo/StructuredData';
import { WebSite, WithContext } from 'schema-dts';
import { getAllPosts } from '@/lib/mdx';

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
