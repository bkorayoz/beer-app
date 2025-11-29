import { Link } from "@/i18n/routing";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SemanticHeading } from "@/components/aeo/SemanticHeading";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
  category: string;
  readTime: string;
}

export function BlogCard({ title, excerpt, imageUrl, slug, category, readTime }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block h-full group">
      <Card className="h-full overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col rounded-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4 bg-beer-amber text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {category}
          </div>
        </div>
        
        <CardContent className="flex-1 p-6">
          <SemanticHeading as="h3" className="mb-3 text-xl font-bold font-serif leading-tight group-hover:text-beer-amber transition-colors">
            {title}
          </SemanticHeading>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-0">
            {excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0 text-xs text-muted-foreground font-medium border-t border-border/40 mt-auto flex justify-between items-center">
           <span>{readTime}</span>
           <span className="group-hover:text-beer-amber transition-colors">Read Article →</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

