import { SemanticHeading } from '@/components/aeo/SemanticHeading';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { StructuredData } from '@/components/aeo/StructuredData';
import { BlogPosting, WithContext } from 'schema-dts';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/routing';
import { ChevronLeft, User, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';

// Mock fetch function
function getPost(slug: string) {
  // In a real app, you would fetch this data from a CMS or database
  return {
    slug,
    title: "Pouring the Perfect Pint",
    date: "2025-04-15",
    author: "John Doe",
    excerpt: "Mastering the art of the pour is essential for any beer enthusiast.",
    image: "/images/blog/pouring-beer.jpg", // Placeholder, in real app this would be dynamic
  }
}

const tocItems = [
  { id: "introduction", text: "Introduction", level: 2 },
  { id: "ingredients", text: "The Ingredients of a Good Pour", level: 2 },
  { id: "process", text: "The Process", level: 2 },
  { id: "conclusion", text: "Conclusion", level: 2 },
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  const structuredData: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author
    },
    description: post.excerpt
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="container py-10 px-4 md:px-6">
        <div className="mb-8">
          <Link href="/blog" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Blog
          </Link>
          <SemanticHeading as="h1" className="mb-6 text-4xl md:text-5xl font-serif font-bold tracking-tight">{post.title}</SemanticHeading>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-muted">
            {/* Using a placeholder image from unsplash for now since we don't have local assets */}
            <Image
              src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=2070&auto=format&fit=crop"
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_250px] lg:gap-16">
          <article className="prose prose-stone dark:prose-invert max-w-none">
            <div className="lead text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </div>

            <SemanticHeading as="h2" id="introduction">Introduction</SemanticHeading>
            <p>Beer is more than just a beverage; it is an experience. The way you pour a pint can significantly affect the taste, aroma, and overall enjoyment.</p>
            <p>Many people believe that pouring beer is as simple as tilting the glass and letting it flow. However, there is a science to it that involves fluid dynamics, carbonation release, and aromatic activation.</p>

            <SemanticHeading as="h2" id="ingredients">The Ingredients of a Good Pour</SemanticHeading>
            <p>To understand the pour, you must understand the beer. Carbonation levels, temperature, and glassware play crucial roles. A beer served too cold will mask flavors, while one served too warm might feel flat.</p>

            <SemanticHeading as="h2" id="process">The Process</SemanticHeading>
            <ol>
              <li><strong>Clean Glassware:</strong> Start with a beer-clean glass. Any oil or residue can kill the head retention.</li>
              <li><strong>The Angle:</strong> Tilt the glass at a 45-degree angle. Aim for the middle of the glass side.</li>
              <li><strong>The Pour:</strong> Pour vigorously at first to release carbonation. This prevents the beer from bloating you later.</li>
              <li><strong>The Head:</strong> Straighten the glass as you reach the top to form a perfect foam head.</li>
            </ol>

            <SemanticHeading as="h2" id="conclusion">Conclusion</SemanticHeading>
            <p>Practice makes perfect. Don't be afraid of a little foam; it releases aromatics that enhance the flavor. Cheers!</p>
          </article>

          <aside className="hidden md:block">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

