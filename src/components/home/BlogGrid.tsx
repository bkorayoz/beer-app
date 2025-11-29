import { BlogCard } from "@/components/BlogCard";
import { SemanticHeading } from "@/components/aeo/SemanticHeading";
import { useTranslations } from "next-intl";

// Data extracted from Figma data/blogPosts.ts
const POSTS = [
  {
    id: '1',
    title: 'The Art of Brewing the Perfect IPA',
    excerpt: 'Discover the secrets behind crafting a balanced India Pale Ale with the right hop profile and fermentation techniques.',
    imageUrl: 'https://images.unsplash.com/photo-1643307282439-08cb542c6edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBnbGFzc3xlbnwxfHx8fDE3NjQyODU0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    slug: 'art-of-brewing-perfect-ipa',
    category: 'Brewing',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Understanding Hop Varieties and Their Flavors',
    excerpt: 'A comprehensive guide to different hop varieties and how they contribute unique characteristics to your brew.',
    imageUrl: 'https://images.unsplash.com/photo-1568722219224-ab9215d07192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwaG9wcyUyMGluZ3JlZGllbnRzfGVufDF8fHx8MTc2NDM2OTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    slug: 'understanding-hop-varieties',
    category: 'Ingredients',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Beer Tasting 101: Developing Your Palate',
    excerpt: 'Learn the fundamentals of beer tasting and how to identify different flavor profiles and aromas.',
    imageUrl: 'https://images.unsplash.com/photo-1613623925195-602740fe7973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwdGFzdGluZyUyMGZsaWdodHxlbnwxfHx8fDE3NjQzNjk3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    slug: 'beer-tasting-101',
    category: 'Culture',
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'The History of Barrel-Aged Beers',
    excerpt: 'Explore the rich tradition of aging beer in oak barrels and its impact on modern craft brewing.',
    imageUrl: 'https://images.unsplash.com/photo-1721815486909-4640821e2a9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmV3aW5nJTIwcHJvY2VzcyUyMGJhcnJlbHN8ZW58MXx8fHwxNzY0MzY5NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    slug: 'history-barrel-aged-beers',
    category: 'History',
    readTime: '10 min read'
  },
  {
    id: '5',
    title: 'Craft Beer Culture Around the World',
    excerpt: 'A journey through the diverse beer cultures across continents, from Belgian monasteries to American craft breweries.',
    imageUrl: 'https://images.unsplash.com/photo-1563866387755-9ac9d401ce0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwcHViJTIwY3VsdHVyZXxlbnwxfHx8fDE3NjQzNjk3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    slug: 'craft-beer-culture-world',
    category: 'Culture',
    readTime: '12 min read'
  },
  {
    id: '6',
    title: 'Home Brewing Equipment Essentials',
    excerpt: 'Everything you need to know about setting up your first home brewing system and essential equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1758588370915-8aadfb709d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwYnJld2VyeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjQyNjY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    slug: 'home-brewing-equipment-essentials',
    category: 'Brewing',
    readTime: '7 min read'
  }
];

export function BlogGrid() {
  const t = useTranslations('blog');
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
        <SemanticHeading as="h2" className="text-center mb-12 font-serif text-3xl md:text-4xl">
          {t('latestArticles')}
        </SemanticHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              imageUrl={post.imageUrl}
              slug={post.slug}
              category={post.category}
              readTime={post.readTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
