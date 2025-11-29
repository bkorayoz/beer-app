"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";
import { SemanticHeading } from "@/components/aeo/SemanticHeading";

// Using a high-quality beer brewing image from Unsplash as placeholder since we don't have the Figma asset file
const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1563866387755-9ac9d401ce0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwcHViJTIwY3VsdHVyZXxlbnwxfHx8fDE3NjQzNjk3NTl8MA&ixlib=rb-4.1.0&q=80&w=1920";

export function Hero() {
  const t = useTranslations('hero');
  
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={DEFAULT_HERO_IMAGE}
          alt="Beer brewing background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay using the specific variable from globals.css logic */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" /> 
      </div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px] relative z-10 text-center">
        <SemanticHeading as="h1" className="mb-6 text-white drop-shadow-md font-serif font-bold text-5xl md:text-6xl">
          {t('title')}
        </SemanticHeading>
        <p className="max-w-2xl mx-auto mb-0 text-gray-200 text-xl md:text-2xl font-sans leading-relaxed drop-shadow-sm">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}

