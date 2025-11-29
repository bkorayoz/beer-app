import { BlogCard } from "@/components/BlogCard";
import { SemanticHeading } from "@/components/aeo/SemanticHeading";
import { useTranslations } from "next-intl";

import { PostMeta } from "@/lib/mdx";

interface BlogGridProps {
  posts: PostMeta[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const t = useTranslations('blog');

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
        <SemanticHeading as="h2" className="text-center mb-12 font-serif text-3xl md:text-4xl">
          {t('latestArticles')}
        </SemanticHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              imageUrl={post.image || '/images/blog/placeholder.jpg'}
              slug={post.slug}
              category={post.category || 'General'}
              readTime="5 min read" // Placeholder or calculate based on content
            />
          ))}
        </div>
      </div>
    </section>
  );
}
