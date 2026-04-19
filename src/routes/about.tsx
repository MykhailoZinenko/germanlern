import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-4xl font-bold text-foreground">About</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
        GermanLern is a personal German vocabulary learning app built with
        TanStack Start, Supabase, and a custom 3D companion.
      </p>
    </main>
  )
}
