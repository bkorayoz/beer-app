"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

export function SearchBar() {
  const t = useTranslations('HomePage');
  
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
      <Input 
        placeholder={t('searchPlaceholder')}
        className="pl-12 h-12 text-lg rounded-full shadow-sm border-muted-foreground/20 bg-background/50 backdrop-blur-sm focus-visible:ring-beer-amber"
      />
    </div>
  )
}

