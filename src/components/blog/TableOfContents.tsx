"use client"

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  // We might need a translation key for "Table of Contents" later, 
  // but for now we'll hardcode or use a generic one if available.
  // const t = useTranslations('blog'); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="space-y-2 text-sm">
      <p className="font-serif font-bold text-lg mb-4">Table of Contents</p>
      <ul className="space-y-2 border-l-2 border-muted pl-4">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 0.5}rem` }}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`text-left hover:text-beer-amber transition-colors block py-1 ${activeId === item.id
                  ? 'text-beer-amber font-medium'
                  : 'text-muted-foreground'
                }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

