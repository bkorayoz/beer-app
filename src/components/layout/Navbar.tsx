"use client"

import { Link } from "@/i18n/routing";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { SemanticHeading } from "@/components/aeo/SemanticHeading";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SearchCommand } from "@/components/search/SearchCommand";

export function Navbar() {
  const t = useTranslations('header');
  const tHero = useTranslations('hero');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <SemanticHeading as="h2" className="text-2xl m-0 font-serif font-bold">{tHero('title')}</SemanticHeading>
          </Link>

          {/* Navigation & Actions */}
          <nav className="flex items-center gap-6">
            <Link href="/" className="hidden md:block text-sm font-medium text-foreground/60 hover:text-foreground/80 transition-colors">
              {t('home')}
            </Link>
            <Link href="/about" className="hidden md:block text-sm font-medium text-foreground/60 hover:text-foreground/80 transition-colors">
              {t('about')}
            </Link>

            <div className="flex items-center gap-2">
              <SearchCommand
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-beer-amber"
                    aria-label={t('search')}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                }
              />

              <LanguageSwitcher />

              <ModeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
