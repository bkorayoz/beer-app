import { BlogGrid } from '@/components/home/BlogGrid';
import { SemanticHeading } from '@/components/aeo/SemanticHeading';
import { useTranslations } from 'next-intl';

import { getAllPosts } from '@/lib/mdx';

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const t = useTranslations('Navigation');

  return (
    <div className="container py-12 px-4 md:px-6">
      <SemanticHeading as="h1" className="mb-8 text-center">{t('blog')}</SemanticHeading>
      <BlogGrid posts={posts} />
    </div>
  )
}

