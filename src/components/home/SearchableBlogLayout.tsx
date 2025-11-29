"use client"

import { useState, useEffect } from 'react';
import { AdvancedSearch } from './AdvancedSearch';
import { BlogGrid } from './BlogGrid';
import { PostMeta } from '@/lib/mdx';

interface SearchableBlogLayoutProps {
    posts: PostMeta[];
}

export function SearchableBlogLayout({ posts: initialPosts }: SearchableBlogLayoutProps) {
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState<PostMeta[]>(initialPosts);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const searchPosts = async () => {
            if (!query.trim()) {
                setPosts(initialPosts);
                return;
            }

            setIsSearching(true);
            try {
                const res = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                });
                const data = await res.json();

                if (data.results) {
                    // Map search results back to PostMeta format
                    // Note: The API returns { id, content, metadata, similarity }
                    // We need to map metadata to PostMeta
                    const mappedPosts = data.results.map((result: any) => ({
                        ...result.metadata,
                        slug: result.metadata.slug, // Ensure slug is present
                    }));
                    setPosts(mappedPosts);
                }
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsSearching(false);
            }
        };

        const timer = setTimeout(searchPosts, 500); // Debounce
        return () => clearTimeout(timer);
    }, [query, initialPosts]);

    return (
        <>
            <AdvancedSearch query={query} onQueryChange={setQuery} />
            <div className={isSearching ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
                <BlogGrid posts={posts} />
            </div>
        </>
    );
}
