import { Thing, WithContext } from 'schema-dts';

type JsonLdProps<T extends Thing> = {
    schema: WithContext<T>;
};

const safeJsonStringify = (data: any) => {
    return JSON.stringify(data).replace(/<\/script>/g, '<\\/script>');
};

export function JsonLd<T extends Thing>({ schema }: JsonLdProps<T>) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonStringify(schema) }}
        />
    );
}
