import { createClient } from '@supabase/supabase-js';
import { generateEmbedding } from '../src/lib/embeddings';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const rootDirectory = path.join(process.cwd(), 'content', 'posts');

async function main() {
    console.log('Starting indexing...');

    const files = fs.readdirSync(rootDirectory);

    for (const file of files) {
        if (!file.endsWith('.mdx')) continue;

        const slug = file.replace(/\.mdx$/, '');
        const filePath = path.join(rootDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        console.log(`Processing ${slug}...`);

        // Generate embedding for the content (and title/excerpt)
        const textToEmbed = `${data.title} ${data.excerpt} ${content}`;
        const embedding = await generateEmbedding(textToEmbed);

        // Insert into Supabase
        const { error } = await supabase.from('documents').upsert({
            content: content,
            metadata: {
                slug,
                title: data.title,
                excerpt: data.excerpt,
                date: data.date,
                author: data.author,
                image: data.image,
                category: data.category,
            },
            embedding,
        });

        if (error) {
            console.error(`Error inserting ${slug}:`, error);
        } else {
            console.log(`Indexed ${slug}`);
        }
    }

    console.log('Indexing complete!');
}

main().catch(console.error);
