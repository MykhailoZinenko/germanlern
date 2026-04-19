import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { Spinner } from '#/components/ui/spinner'

const WireframeExplorer = lazy(() =>
  import('#/sandbox/wireframe-explorer').then((m) => ({ default: m.WireframeExplorer }))
)

export const Route = createFileRoute('/sandbox/explorer')({
  component: ExplorerPage,
})

function ExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <WireframeExplorer />
    </Suspense>
  )
}
