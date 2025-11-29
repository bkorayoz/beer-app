"use client"

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SemanticHeading } from "@/components/aeo/SemanticHeading";

export function AdvancedSearch() {
    const t = useTranslations('search');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <section id="advanced-search" className="py-12 md:py-16 bg-card" data-search-section>
            <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
                <div className="max-w-4xl mx-auto">
                    <SemanticHeading as="h2" className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">
                        {t('title')}
                    </SemanticHeading>

                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Input
                                type="text"
                                placeholder={t('placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-6 pr-12 py-6 text-lg rounded-lg border-2 border-input bg-background focus-visible:ring-0 focus-visible:border-primary transition-all"
                            />
                            <Search
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
                                size={24}
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="px-8 py-6 text-lg font-semibold bg-beer-amber hover:bg-beer-amber/90 text-white rounded-lg transition-all"
                        >
                            {t('button')}
                        </Button>
                    </form>

                    <div className="mt-6 flex flex-wrap gap-3 justify-center items-center">
                        <span className="text-muted-foreground">{t('popular')}</span>
                        {['IPA', 'Lager', 'Home Brewing', 'Beer History', 'Craft Beer'].map((tag) => (
                            <Button
                                key={tag}
                                variant="outline"
                                className="rounded-full border-border hover:border-beer-amber hover:text-beer-amber transition-all bg-transparent"
                                onClick={() => setSearchQuery(tag)}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
