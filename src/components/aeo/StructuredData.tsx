import Script from 'next/script';
import { WithContext, Thing } from 'schema-dts';

type StructuredDataProps<T extends Thing> = {
  data: WithContext<T>;
  id?: string;
};

export function StructuredData<T extends Thing>({ data, id = 'structured-data' }: StructuredDataProps<T>) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive" // or beforeInteractive if critical
    />
  );
}

