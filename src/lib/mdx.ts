import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { AnswerTarget } from '@/components/aeo/AnswerTarget';

const rootDirectory = path.join(process.cwd(), 'content', 'posts');

export type PostMeta = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    image?: string;
    tags?: string[];
    [key: string]: any;
};

export async function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Replace [Answer Target] tags with <AnswerTarget> component
    fileContent = fileContent.replace(/\[Answer Target\]/g, '<AnswerTarget>').replace(/\[\/Answer Target\]/g, '</AnswerTarget>');

    const { content, frontmatter } = await compileMDX<{ title: string;[key: string]: any }>({
        source: fileContent,
        components: { AnswerTarget },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            },
        },
    });

    return {
        meta: { ...frontmatter, slug: realSlug } as PostMeta,
        content,
        rawContent: fileContent,
    };
}

export async function getAllPosts() {
    if (!fs.existsSync(rootDirectory)) return [];

    const files = fs.readdirSync(rootDirectory);

    const posts = files.map((file) => {
        const filePath = path.join(rootDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        return {
            ...data,
            slug: file.replace(/\.mdx$/, ''),
        } as PostMeta;
    });

    return posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export function getHeadings(source: string) {
    const headingLines = source.split('\n').filter((line) => {
        return line.match(/^#{2,3}\s/);
    });

    return headingLines.map((raw) => {
        const text = raw.replace(/^#{2,3}\s/, '');
        const level = raw.slice(0, 3) === '###' ? 3 : 2;
        const slug = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        return { text, level, slug };
    });
}
