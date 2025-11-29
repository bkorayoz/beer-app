import { BlogGrid } from '@/components/home/BlogGrid';
import { SemanticHeading } from '@/components/aeo/SemanticHeading';
import { useTranslations } from 'next-intl';

export default function BlogIndexPage() {
  const t = useTranslations('Navigation');
  
  return (
    <div className="container py-12 px-4 md:px-6">
      <SemanticHeading as="h1" className="mb-8 text-center">{t('blog')}</SemanticHeading>
      <BlogGrid />
    </div>
  )
}

