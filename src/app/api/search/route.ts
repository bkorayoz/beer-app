import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/embeddings';
import { supabaseAdmin } from '@/lib/supabase/server';
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

// Rate Limiter: 10 requests per minute per IP
const rateLimit = new LRUCache<string, number>({
    max: 500,
    ttl: 60 * 1000, // 1 minute
});

const SearchSchema = z.object({
    query: z.string().min(1).max(500),
});

export async function POST(req: NextRequest) {
    try {
        // Rate Limiting
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const currentUsage = rateLimit.get(ip) || 0;

        if (currentUsage >= 10) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
        rateLimit.set(ip, currentUsage + 1);

        const body = await req.json();

        // Input Validation
        const validation = SearchSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
        }
        const { query } = validation.data;

        // Generate embedding for the search query
        const embedding = await generateEmbedding(query);

        // Call Supabase RPC function
        const { data: documents, error } = await supabaseAdmin.rpc('match_documents', {
            query_embedding: embedding,
            match_threshold: 0.3, // Adjusted based on testing (relevant ~0.4, irrelevant ~0.15)
            match_count: 5,
        });

        if (error) {
            console.error('Supabase search error:', error);
            return NextResponse.json({ error: 'Search failed' }, { status: 500 });
        }

        return NextResponse.json({ results: documents });
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
