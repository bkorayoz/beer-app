import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('Footer');
  
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-6 md:py-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
           <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
             {t('copyright')}
           </p>
        </div>
      </div>
    </footer>
  );
}

