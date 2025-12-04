import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { SITE_CONFIG } from '@/lib/config';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const defaultLocale = routing.defaultLocale;

  // Get all blog posts
  const posts = await getAllPosts();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/${defaultLocale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${defaultLocale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${defaultLocale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => {
    const postDate = new Date(post.date);
    const now = new Date();
    const daysSincePublished = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Determine change frequency based on age
    // Recent posts (less than 30 days) are weekly, older posts are monthly
    const changeFrequency: 'weekly' | 'monthly' = daysSincePublished < 30 ? 'weekly' : 'monthly';

    return {
      url: `${baseUrl}/${defaultLocale}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency,
      priority: 0.8,
    };
  });

  return [...staticPages, ...blogPages];
}

