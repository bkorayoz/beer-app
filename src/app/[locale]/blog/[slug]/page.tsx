import { notFound } from 'next/navigation';
import { getPostBySlug, getHeadings } from '@/lib/mdx';
import { JsonLd } from '@/components/aeo/JsonLd';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { SemanticHeading } from '@/components/aeo/SemanticHeading';
import { Link } from '@/i18n/routing';
import { ChevronLeft, User, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import { BlogPosting, WithContext } from 'schema-dts';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = getHeadings(post.rawContent);
  const tocItems = headings.map(h => ({ id: h.slug, text: h.text, level: h.level }));

  const structuredData: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta.title,
    datePublished: post.meta.date,
    author: {
      '@type': 'Person',
      name: post.meta.author
    },
    description: post.meta.excerpt,
    image: post.meta.image ? [post.meta.image] : undefined,
  };

  return (
    <>
      <JsonLd schema={structuredData} />
      <div className="container py-10 px-4 md:px-6">
        <div className="mb-8">
          <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Blog
          </Link>
          <SemanticHeading as="h1" className="mb-6 text-4xl md:text-5xl font-serif font-bold tracking-tight">
            {post.meta.title}
          </SemanticHeading>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.meta.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {post.meta.image && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-muted">
              <Image
                src={post.meta.image}
                alt={post.meta.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_250px] lg:gap-16">
          <article className="prose prose-stone dark:prose-invert max-w-none">
            <div className="lead text-xl text-muted-foreground mb-8">
              {post.meta.excerpt}
            </div>
            {post.content}
          </article>

          <aside className="hidden md:block">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
