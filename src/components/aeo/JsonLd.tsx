import { Thing, WithContext } from 'schema-dts';

type JsonLdProps<T extends Thing> = {
    schema: WithContext<T>;
};

export function JsonLd<T extends Thing>({ schema }: JsonLdProps<T>) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
