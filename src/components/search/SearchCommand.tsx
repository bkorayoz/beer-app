"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Calculator, Calendar, CreditCard, Settings, Smile, User, FileText } from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

interface SearchResult {
    id: number;
    content: string;
    metadata: {
        slug: string;
        title: string;
    };
    similarity: number;
}

interface SearchCommandProps {
    trigger?: React.ReactNode;
}

export function SearchCommand({ trigger }: SearchCommandProps) {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<SearchResult[]>([])
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()
    const t = useTranslations('search')

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    React.useEffect(() => {
        if (!query) {
            setResults([])
            return
        }

        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                })
                const data = await res.json()
                if (data.results) {
                    setResults(data.results)
                }
            } catch (error) {
                console.error('Search error:', error)
            } finally {
                setLoading(false)
            }
        }, 500) // Debounce 500ms

        return () => clearTimeout(timer)
    }, [query])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <div onClick={() => setOpen(true)} className="cursor-pointer">
                {trigger || (
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full md:w-[200px] lg:w-[300px] justify-start text-muted-foreground"
                    >
                        <span className="inline-flex">{t('placeholder')}...</span>
                        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>
                )}
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder={t('placeholder')}
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    <CommandEmpty>{loading ? 'Searching...' : 'No results found.'}</CommandEmpty>
                    {results.length > 0 && (
                        <CommandGroup heading="Blog Posts">
                            {results.map((result) => (
                                <CommandItem
                                    key={result.id}
                                    value={result.metadata.title}
                                    onSelect={() => {
                                        runCommand(() => router.push(`/blog/${result.metadata.slug}`))
                                    }}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>{result.metadata.title}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}
