import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-foreground">
        GermanLern
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Your personal German vocabulary companion. Dashboard coming soon.
      </p>
    </main>
  )
}
