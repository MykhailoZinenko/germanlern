import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[var(--surface-raised)]/90 px-4 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-foreground no-underline"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--lumi-mid)]" />
          GermanLern
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/"
            className="text-muted-foreground no-underline transition-colors hover:text-foreground"
            activeProps={{ className: 'text-foreground' }}
          >
            Home
          </Link>
          <Link
            to="/sandbox/registry"
            className="text-muted-foreground no-underline transition-colors hover:text-foreground"
            activeProps={{ className: 'text-foreground' }}
          >
            Registry
          </Link>
        </div>
      </nav>
    </header>
  )
}
